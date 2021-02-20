<template>
	<div class="media-thumbnail">
		<div class="media-thumbnail__slot">
			<slot />
		</div>
		<div class="media-thumbnail__icon">
			<ion-icon :icon="icon" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { image, camera } from 'ionicons/icons'
import { IonIcon } from '@ionic/vue'
export default defineComponent({
	name: 'MediaThumbnail',
	components: { IonIcon },
	props: {
		type: { type: String, required: true }
	},
	setup (props) {
		const icon = computed(() => props.type === 'image' ? image : camera)

		return {
			icon
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
