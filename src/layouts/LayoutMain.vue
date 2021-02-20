<template>
	<ion-page id="main-content">
		<ion-header v-if="!noHeader">
			<ion-toolbar>
				<ion-buttons slot="start" v-if="back || backHref">
					<ion-back-button v-if="back" :default-href="{name: 'viewImageList'}" />
					<ion-button v-else :router-link="backHref">
						<ion-icon slot="icon-only" :icon="arrowBack" />
					</ion-button>
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
import { defineComponent } from 'vue'
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
import { menu, arrowBack } from 'ionicons/icons'

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
	props: {
		title: { type: String, required: true },
		back: { type: Boolean, default: false },
		backHref: { type: Object, default: null },
		noHeader: { type: Boolean, default: false }
	},
	setup () {
		const openMenu = async () => {
			await menuController.open()
		}

		return {
			openMenu,
			menu,
			arrowBack
		}
	}

})
</script>

<style scoped>

</style>
