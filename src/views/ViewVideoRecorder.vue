<template>
	<layout-main title="Video recorder">
		<ion-button @click="recordVideo">Record</ion-button>
		<div>{{ debug }}</div>
<!--		<video width="400" controls>-->
<!--			<source :src="local" type="video/mp4">-->
<!--			Your browser does not support HTML video.-->
<!--		</video>-->
<!--		<video width="400" controls>-->
<!--			<source :src="full" type="video/mp4">-->
<!--			Your browser does not support HTML video.-->
<!--		</video>-->
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton } from '@ionic/vue'
import { MediaCapture } from '@ionic-native/media-capture'

import {CopyOptions, FilesystemDirectory, Plugins} from '@capacitor/core'
const { Filesystem } = Plugins
import { Capacitor } from '@capacitor/core'

export default defineComponent({
	name: 'ViewVideoRecorder',
	components: { IonButton },
	setup () {
		const debug = ref(null)
		const local = ref(null)
		const full = ref(null)

		const recordVideo = async () => {
			const options = {
				limit: 1,
				duration: 10
			}

			MediaCapture.captureVideo(options).then((res: any) => {
				const capturedFile = res[0]

				debug.value = Capacitor.convertFileSrc(capturedFile.fullPath) + '  ---  ' + Capacitor.convertFileSrc(capturedFile.localURL)
			})
		}

		return {
			recordVideo,
			debug,
			local,
			full
		}
	}
})
</script>

<style scoped>

</style>
