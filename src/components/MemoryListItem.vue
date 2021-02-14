<template>
	<ion-item :router-link="{name: 'memoryDetail', params: {id: model.id}}">
		<ion-thumbnail slot="start">
			<ion-img :src="model.image" />
		</ion-thumbnail>
		<ion-label>
			{{ model.title }}
		</ion-label>
	</ion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/vue'

export default defineComponent({
	name: 'MemoryListItem',
	components: { IonItem, IonThumbnail, IonImg, IonLabel },
	props: {
		model: { type: Object, required: true }
	}
})
</script>

<style scoped>

</style>
