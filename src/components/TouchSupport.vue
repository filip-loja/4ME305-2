<template>
	<div
		class="ion-activatable ripple-parent"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
		@touchmove="onTouchMove"
	>
		<slot />
		<ion-ripple-effect />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonRippleEffect, IonIcon } from '@ionic/vue'
export default defineComponent({
	name: 'TouchSupport',
	components: { IonRippleEffect, IonIcon },
	emits: ['press', 'long-press'],
	setup (props, { emit }) {

		let timeoutRef: number = null
		let touchStart: number = null
		let touchEnd: number = null
		const longPressThreshold = 600

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

		const emitPress = () => {
			if (!cancelled) {
				emit('press')
			}
		}

		const onTouchStart = () => {
			moveStart = true
			cancelled = false
			touchStart = Date.now()
			timeoutRef = setTimeout(emitLongPress, longPressThreshold)
		}

		const onTouchEnd = (e: Event) => {
			e.preventDefault()
			touchEnd = Date.now()
			clearTimeout(timeoutRef)
			timeoutRef = null
			if ((touchEnd - touchStart) < longPressThreshold) {
				emitPress()
			}
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
			onTouchStart,
			onTouchEnd,
			onTouchMove
		}
	}
})
</script>

<style>

</style>
