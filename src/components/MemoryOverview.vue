<template>
	<div>
		<ion-img :src="model.image" />
		<h2 class="ion-text-center">{{ model.title }}</h2>
		<p class="ion-text-center">{{ model.description }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonImg } from '@ionic/vue'

export default defineComponent({
	name: 'MemoryOverview',
	components: {
    IonImg
	},
	props: {
		model: { type: Object, required: true }
	}
})
</script>

<style scoped>

</style>
