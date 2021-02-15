<template>
	<ion-img
		v-if="imageSrc"
		:src="imageSrc"
		@contextmenu="onContextMenu"
		@touchstart="longPressStart"
		@touchend="longPressEnd"
		@touchmove="onTouchMove"
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
	emits: ['press', 'long-press', 'load'],
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
				emit('load', imageSrc.value)
			}
		}, { immediate: true })

		// @ts-ignore
		let timeoutRef = null
		let touchStart: number = null
		let touchEnd: number = null
		const threshold = 1000

		let touchStartX = 0
		let touchStartY = 0
		let moveStart = false
		let cancelled = false
		const moveThreshold = 50

		const emitLongPress = () => {
			if (!cancelled) {
				emit('long-press')
			}
		}

		const longPressStart = () => {
			moveStart = true
			cancelled = false
			touchStart = Date.now()
			timeoutRef = setTimeout(emitLongPress, threshold)
		}

		const longPressEnd = (e: Event) => {
			e.preventDefault()
			touchEnd = Date.now()
			// @ts-ignore
			clearTimeout(timeoutRef)
			timeoutRef = null
			if ((touchEnd - touchStart) < threshold && !cancelled) {
				emit('press')
			}
		}

		const onContextMenu = (e: Event) => {
			e.preventDefault()
			return true
		}

		const onTouchMove = (e: any) => {
			if (moveStart) {
				touchStartX = e.targetTouches[0].screenX
				touchStartY = e.targetTouches[0].screenY
				moveStart = false
			} else if (!cancelled) {
				const diffX = touchStartX - e.targetTouches[0].screenX
				const diffY = touchStartY - e.targetTouches[0].screenY
				if (Math.abs(diffX) > moveThreshold || Math.abs(diffY) > moveThreshold) {
					cancelled = true
				}
			}
		}

		return {
			imageSrc,
			longPressStart,
			longPressEnd,
			onContextMenu,
			onTouchMove
		}
	}
})
</script>

<style scoped>

</style>
