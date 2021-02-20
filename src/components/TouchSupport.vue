<template>
	<div
		class="ion-activatable ripple-parent media-thumbnail1"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
		@touchmove="onTouchMove"
	>
		<div class="media-thumbnail__slot1">
			<slot />
		</div>
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

	.media-thumbnail {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100px;
		position: relative;
		padding: 4px;
	}

	.media-thumbnail__slot {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: hidden;
		align-items: center;
		justify-content: center;
	}

	.media-thumbnail__slot > * {
		width: 100%;
		height: 100%;
		object-fit: cover !important;
	}

	.media-thumbnail__icon {
		position: absolute;
		bottom: 4px;
		right: 8px;
		opacity: 0.8;
		color: white;
	}

</style>
