<template>
	<ion-page id="main-content">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start" v-if="showBackButton">
					<ion-back-button :default-href="{name: 'root'}" />
				</ion-buttons>
				<ion-title>{{ title }}</ion-title>
				<ion-buttons slot="end">
					<ion-button expand="block" @click="openMenu">
						<ion-icon slot="icon-only" :icon="menu" />
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<slot />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonBackButton,
	IonButtons,
	IonMenu,
	IonLabel,
	IonItem,
	IonList,
	IonButton,
	menuController,
	IonIcon
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import { menu } from 'ionicons/icons'

export default defineComponent({
	name: 'LayoutMain',
	components: {
		IonPage,
		IonHeader,
		IonContent,
		IonTitle,
		IonToolbar,
		IonBackButton,
		IonButtons,
		IonMenu,
		IonLabel,
		IonItem,
		IonList,
		IonButton,
		IonIcon
	},
	props: ['title'],
	setup () {
		const route = useRoute()

		const showBackButton = computed<boolean>(() => !['root', 'memories'].includes(route.name as string))

		const openMenu = async () => {
			await menuController.open()
		}

		return {
			showBackButton,
			openMenu,
			menu
		}
	}

})
</script>

<style scoped>

</style>
