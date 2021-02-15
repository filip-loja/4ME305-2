<template>
	<ion-img
		v-if="imageSrc"
		:src="imageSrc"
		@contextmenu="onContextMenu"
		@touchstart="longPressStart"
		@touchend="longPressEnd"
	/>
</template>

<script lang="ts">
import { defineComponent, watch, ref, PropType } from 'vue'
import { IonImg } from '@ionic/vue'
import { Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

export interface ImageSource {
	path: string;
	directory: any;
}

export default defineComponent({
	name: 'StoredImage',
	components: { IonImg },
	emits: ['press', 'long-press'],
	props: {
		source: { type: Object as PropType<ImageSource|null>, default: null }
	},
	setup (props, { emit }) {
		const imageSrc = ref(null)

		watch(() => props.source, async (newSource: ImageSource) => {
			if (newSource) {
				const file = await Filesystem.readFile({
					path: newSource.path,
					directory: newSource.directory
				})
				imageSrc.value = `data:image/jpeg;base64,${file.data}`
			}
		}, { immediate: true })



		const emitLongPress = () => emit('long-press')

		// @ts-ignore
		let timeoutRef = null
		let touchStart: number = null
		let touchEnd: number = null
		const threshold = 1000

		const longPressStart = (e: Event) => {
			e.preventDefault()
			touchStart = Date.now()
			timeoutRef = setTimeout(emitLongPress, threshold)
		}

		const longPressEnd = (e: Event) => {
			e.preventDefault()
			touchEnd = Date.now()
			// @ts-ignore
			clearTimeout(timeoutRef)
			timeoutRef = null
			if ((touchEnd - touchStart) < threshold) {
				console.log('emit press')
				emit('press')
			}
		}

		const onContextMenu = (e: Event) => {
			e.preventDefault()
			return true
		}

		return {
			imageSrc,
			longPressStart,
			longPressEnd,
			onContextMenu
		}
	}
})
</script>

<style scoped>

</style>
