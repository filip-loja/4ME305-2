<template>
	<layout-main title="Assignment 2">
		<ion-grid>
			<ion-row>
				<ion-col size="6" v-for="(item, index) in menuItems" :key="index">
					<touch-support @press="item.handler">
						<ion-card style="margin: 0">
							<ion-card-header class="ion-text-center">
								<ion-icon :icon="item.icon" size="large" />
								<ion-card-title><strong>{{ item.label }}</strong></ion-card-title>
							</ion-card-header>
						</ion-card>
					</touch-support>
				</ion-col>
			</ion-row>
		</ion-grid>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import navigation from '@/navigation'
import {
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardTitle, IonIcon
} from '@ionic/vue'
import TouchSupport from '@/components/TouchSupport.vue'
export default defineComponent({
	name: 'ViewHome',
	components: { IonGrid, IonRow, IonCol, TouchSupport, IonCard, IonCardHeader, IonCardTitle, IonIcon },
	setup () {
		const store = useStore()
		const router = useRouter()
		const menuItems = ref(navigation(router, store).slice(1))
		return {
			menuItems
		}
	}
})
</script>

<style scoped>

</style>
