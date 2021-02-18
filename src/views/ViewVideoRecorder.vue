<template>
	<layout-main title="Video recorder">
		<div class="recorder-bg">
			<video class="video" ref="video" autoplay playsinline muted style="width: 100%"></video>
<!--			<ion-button @click="playVideo('1613598255686.mp4')">Play</ion-button>-->

<!--			<div id="video-player"></div>-->

			<!--		<video class="video2" ref="player" autoplay controls style="width: 100%"></video>-->
			<div class="video-panel">
				<ion-button fill="clear" size="large" color="dark" class="rec-btn__side">
					<ion-icon :icon="repeat" color="light" />
				</ion-button>

				<ion-button :color="recIconColor" class="rec-btn" @click="toggleRecording">
					<ion-icon :icon="recIcon" />
				</ion-button>

				<ion-button fill="clear" size="large" color="dark" class="rec-btn__side" @click="closeCamera">
					<ion-icon :icon="close" color="light" />
				</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import {alertController, IonButton, IonIcon} from '@ionic/vue'
import { videocam, radioButtonOn, close, repeat } from 'ionicons/icons'
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core'
import * as WebVPPlugin from 'capacitor-video-player'
const { CapacitorVideoPlayer, Filesystem } = Plugins
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
	name: 'ViewVideoRecorder',
	components: { IonButton, IonIcon },
	setup () {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const player = ref(null)
		const isRecording = ref<boolean>(false)

		let stream: any = null
		const video = ref(null)

		const closeStream = () => {
			if (stream) {
				stream.getTracks().forEach((track: any) => track.stop())
				stream = null
			}
		}

		watch(() => route.name, async routeName => {
			if (routeName === 'viewVideoRecorder') {
				stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'user' },
					audio: true
				})
				video.value.srcObject = stream
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

		// TODO prec
		const loadVideo = async (fileName: string) =>  {
			const file = await Filesystem.readFile({
				path: fileName,
				directory: FilesystemDirectory.Data
			})
			return `data:video/mp4;base64,${file.data}`
		}

		// TODO prec
		const playVideo = async (fileName: string) => {
			player.value.src = await loadVideo(fileName)
		}

		const toggleRecording = () => {
			if (isRecording.value) {
				stopRecording()
			} else {
				startRecording()
			}
		}

		const closeCamera = () => router.back()

		return {
			toggleRecording,
			playVideo,
			video,
			player,
			recIcon,
			recIconColor,
			close,
			repeat,
			closeCamera
		}
	}
})
</script>

<style>

	.recorder-bg {
		background-color: black;
		display: block;
		width: 100%;
		height: 100%;
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
