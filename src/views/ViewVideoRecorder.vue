<template>
	<layout-main title="Video recorder">
		<video class="video" ref="video" autoplay playsinline muted style="width: 100%"></video>
		<ion-button @click="recordVideo">Record</ion-button>
		<ion-button @click="stopRecord">Stop</ion-button>
		<ion-button @click="playVideo('1613598255686.mp4')">Play</ion-button>

		<div id="video-player"></div>

		<video class="video2" ref="player" autoplay controls style="width: 100%"></video>

	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton } from '@ionic/vue'
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core'
import * as WebVPPlugin from 'capacitor-video-player'
const { CapacitorVideoPlayer, Filesystem } = Plugins

export default defineComponent({
	name: 'ViewVideoRecorder',
	components: { IonButton },
	setup () {
		const debug = ref(null)
		const local = ref(null)
		const full = ref(null)
		const video = ref(null)
		const player = ref(null)
		const isRecording = ref<boolean>(false)

		let videoPlayer: any = null


		if (Capacitor.isNative) {
			videoPlayer = CapacitorVideoPlayer
		} else {
			videoPlayer = WebVPPlugin.CapacitorVideoPlayer
		}

		let mediaRecorder: any = null

		const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onerror = () => reject(null)
			reader.onload = () => resolve(reader.result)
			reader.readAsDataURL(blob)
		})

		const saveVideo = async (blob: Blob) => {
			const fileName = Date.now() + '.mp4'
			const base64Data = await convertBlobToBase64(blob) as string;
			await Filesystem.writeFile({
				path: fileName,
				data: base64Data,
				directory: FilesystemDirectory.Data
			})
			console.log(fileName)
		}

		const recordVideo = async () => {
			isRecording.value = true
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'user' },
				audio: true
			})

			video.value.srcObject = stream

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

		const stopRecord = () => {
			mediaRecorder.stop()
			mediaRecorder = null
			isRecording.value = false
			video.value.srcObject = null
		}

		const loadVideo = async (fileName: string) =>  {
			const file = await Filesystem.readFile({
				path: fileName,
				directory: FilesystemDirectory.Data
			})
			return `data:video/mp4;base64,${file.data}`
		}

		const playVideo = async (fileName: string) => {
			player.value.src = await loadVideo(fileName)
			// await videoPlayer.initPlayer({
			// 	mode: 'fullscreen',
			// 	url: videoData,
			// 	playerId: 'video-player'
			// })
		}

		return {
			recordVideo,
			stopRecord,
			playVideo,
			debug,
			local,
			full,
			video,
			player
		}
	}
})
</script>

<style scoped>

</style>
