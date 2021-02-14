<template>
	<div>
		<ion-img :src="imageData" />
		<h2 class="ion-text-center">{{ model.title }}</h2>
		<p class="ion-text-center">{{ model.description }}</p>
	</div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import { IonImg } from '@ionic/vue'
import {Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

export default defineComponent({
	name: 'MemoryOverview',
	components: { IonImg },
	props: {
		model: { type: Object, required: true }
	},
	setup (props) {
		const imageData = ref(null)

		watch(() => props.model.image, async (newImgValue) => {
			if (newImgValue && typeof newImgValue === 'object') {
				const file = await Filesystem.readFile({
					path: newImgValue.path,
					directory: newImgValue.directory
				});
				imageData.value = `data:image/jpeg;base64,${file.data}`
			} else {
				imageData.value = newImgValue
			}
		}, {immediate: true})

		return {
			imageData
		}
	}
})
</script>

<style scoped>

</style>
