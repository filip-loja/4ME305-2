<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start" v-if="showBackButton">
					<ion-back-button :default-href="{name: 'root'}" />
				</ion-buttons>
				<ion-title>{{ title }}</ion-title>
				<ion-buttons slot="end">
					<slot name="actions-end" />
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
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/vue'
  export default defineComponent({
    name: 'LayoutMain',
    components: {
      IonPage,
      IonHeader,
      IonContent,
      IonTitle,
      IonToolbar,
      IonBackButton,
      IonButtons
    },
		props: ['title'],
		computed: {
			showBackButton (): boolean {
				return !['root', 'memories'].includes(this.$route.name as string)
			}
		}
  })
</script>

<style scoped>

</style>
