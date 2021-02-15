<template>
	<layout-main title="About">
		<ion-card>
			<ion-card-header class="ion-text-center">
				<ion-card-subtitle>Web and Mobile Development</ion-card-subtitle>
				<ion-card-title><strong>Assignment 2</strong></ion-card-title>
				<ion-card-subtitle>Created by: <strong>Filip Loja</strong></ion-card-subtitle>
			</ion-card-header>

			<ion-card-content>
				TODO some text here
			</ion-card-content>
		</ion-card>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
export default defineComponent({
	name: 'ViewAbout',
	components: { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle }
})
</script>

<style scoped>

</style>
