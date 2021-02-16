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
import { Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

export interface ImageSource {
	path: string;
	directory: any;
}

export default defineComponent({
	name: 'StoredImage',
	components: { IonImg },
	emits: ['load'],
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
