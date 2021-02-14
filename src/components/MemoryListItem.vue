<template>
	<ion-item :router-link="{name: 'memoryDetail', params: {id: model.id}}">
		<ion-thumbnail slot="start">
			<ion-img :src="imageData" />
		</ion-thumbnail>
		<ion-label>
			{{ model.title }}
		</ion-label>
	</ion-item>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/vue'

import {Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

export default defineComponent({
	name: 'MemoryListItem',
	components: { IonItem, IonThumbnail, IonImg, IonLabel },
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
