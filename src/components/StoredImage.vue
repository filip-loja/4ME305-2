<template>
	<ion-img
		v-if="imageSrc"
		:src="imageSrc"
		@contextmenu="onContextMenu"
	/>
</template>

<script lang="ts">
import { defineComponent, watch, ref, PropType } from 'vue'
import { IonImg } from '@ionic/vue'
import { loadMedia } from '@/utils'
import { MediaItem } from '@/store/module-storage/module-storage'

export default defineComponent({
	name: 'StoredImage',
	components: { IonImg },
	emits: ['load'],
	props: {
		model: { type: Object as PropType<MediaItem|null>, default: null }
	},
	setup (props, { emit }) {
		const imageSrc = ref(null)

		watch(() => props.model, async (newModel: MediaItem) => {
			if (newModel) {
				const data = await loadMedia(newModel)
				imageSrc.value = data
				emit('load', data)
			}
		}, { immediate: true })

		const onContextMenu = (e: Event) => {
			e.preventDefault()
			return true
		}

		return {
			imageSrc,
			onContextMenu,
		}
	}
})
</script>

<style scoped>

</style>
