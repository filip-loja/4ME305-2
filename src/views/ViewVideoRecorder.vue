<template>
	<layout-main title="Video recorder" no-header>
		<div class="recorder-bg">
			<div class="top-panel">
				<ion-button fill="clear" size="large" color="dark" @click="closeCamera" :disabled="isRecording">
					<ion-icon :icon="close" color="light" />
				</ion-button>
			</div>
			<video class="video" ref="video" autoplay playsinline muted style="width: 100%"></video>
			<div class="video-panel">
				<ion-button fill="clear" size="large" color="dark" class="rec-btn__side" @click="toggleCamera" :disabled="isRecording">
					<ion-icon :icon="repeat" color="light" />
				</ion-button>

				<ion-button :color="recIconColor" class="rec-btn" @click="toggleRecording">
					<ion-icon :icon="recIcon" />
				</ion-button>

				<ion-button fill="clear" size="large" color="dark" class="rec-btn__side" :router-link="{name: 'viewVideoList'}" :disabled="isRecording">
					<ion-icon :icon="film" color="light" />
				</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { alertController, IonButton, IonIcon } from '@ionic/vue'
import { videocam, radioButtonOn, close, repeat, film } from 'ionicons/icons'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

type CameraMode = 'front' | 'back'

export default defineComponent({
	name: 'ViewVideoRecorder',
	components: { IonButton, IonIcon },
	setup () {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const player = ref(null)
		const isRecording = ref<boolean>(false)
		let mode: CameraMode = 'front'

		let stream: any = null
		const video = ref(null)

		const closeStream = () => {
			if (stream) {
				stream.getTracks().forEach((track: any) => track.stop())
				stream = null
			}
		}

		const openStream = async () => {
			const modes = {
				front: 'user',
				back: { exact: 'environment' }
			}
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: modes[mode] },
				audio: true
			})
			video.value.srcObject = stream
		}

		watch(() => route.name, routeName => {
			if (routeName === 'viewVideoRecorder') {
				openStream()
			} else {
				closeStream()
				video.value.srcObject = null
			}
		}, { immediate: true })

		const recIcon = computed(() => isRecording.value ? radioButtonOn : videocam)
		const recIconColor = computed(() => isRecording.value ? 'danger' : 'light')

		let mediaRecorder: any = null

		const saveVideo = (blob: Blob) => {
			store.dispatch('storage/saveVideo', blob).then(res => {
				if (typeof res === 'number') {
					console.log('SUCCESS: ', res)
				} else {
					alertController.create({
							header: 'Error!',
							message: res,
							backdropDismiss: false,
							buttons: [{
								text: 'Ok',
								role: 'cancel'
							}]
						}).then(alert => alert.present())
				}
			})
		}

		const startRecording = async () => {
			isRecording.value = true
			const options = { mimeType: 'video/webm' }
			// @ts-ignore
			mediaRecorder = new MediaRecorder(stream, options)
			let chunks: any[] = []

			mediaRecorder.ondataavailable = (event: any) => {
				if (event.data && event.data.size > 0) {
					chunks.push(event.data)
				}
			}

			mediaRecorder.onstop = async () => {
				const videoBlob = new Blob(chunks, { type: 'video/webm' })
				saveVideo(videoBlob)
				chunks = []
			}

			mediaRecorder.start(100)
		}

		const stopRecording = () => {
			mediaRecorder.stop()
			mediaRecorder = null
			isRecording.value = false
		}

		const toggleRecording = () => {
			if (isRecording.value) {
				stopRecording()
			} else {
				startRecording()
			}
		}

		const toggleCamera = () => {
			closeStream()
			video.value.srcObject = null
			mode = mode === 'back' ? 'front' : 'back'
			openStream()
		}

		const closeCamera = () => router.back()

		return {
			isRecording,
			toggleRecording,
			video,
			player,
			recIcon,
			recIconColor,
			close,
			repeat,
			film,
			closeCamera,
			toggleCamera
		}
	}
})
</script>

<style>

	.recorder-bg {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		background-color: black;
		width: 100%;
		height: calc(100% - 45px);
	}

	.recorder-bg .video-panel {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 45px;
		position: fixed;
		bottom: 0;
		background-color: var(--ion-color-primary);
		z-index: 1;
	}

	.recorder-bg .top-panel {
		display: table;
		height: 45px;
		position: fixed;
		top: -8px;
		right: -13px;
	}

	.recorder-bg ion-button.rec-btn {
		display: block;
		margin: 0;
		width: 60px;
		height: 60px;
		transform: translateY(-30%);
		--border-radius: 50%;
		z-index: 2;
		position: relative;
	}

	.recorder-bg .rec-btn__side {
		height: 45px;
	}

</style>
