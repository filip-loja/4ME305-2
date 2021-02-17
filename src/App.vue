<template>
	<ion-app>

		<ion-menu side="end" content-id="main-content">
			<ion-content>
				<br />
				<ion-list class="nav-list">
					<ion-item
						v-for="item in menuItems"
						:key="item.label"
						class="ion-activatable ripple-parent"
						@touchend="item.handler"
					>
						<ion-ripple-effect />
						<ion-icon :icon="item.icon" />
						<ion-label style="padding-left: 25px">{{ item.label }}</ion-label>
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-menu>

		<ion-router-outlet />

	</ion-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { IonApp, IonRouterOutlet, menuController, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect } from '@ionic/vue'
import { home, helpCircle, map, card, camera } from 'ionicons/icons'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect },
	setup () {
		const store = useStore()
		const router = useRouter()

		const menuItems = ref([
			{
				label: 'Home',
				icon: home,
				handler: async () => {
					await menuController.close()
					router.push({ name: 'viewImageList' }).catch(() => null)
				}
			},
			{
				label: 'Take Picture',
				icon: camera,
				handler: async () => {
					await menuController.close()
					store.dispatch('storage/takePicture').then(id => router.push({ name: 'viewImageDetail', params: { id } }))
				}
			},
			{
				label: 'Find me',
				icon: map,
				handler: async () => {
					await menuController.close()
					await store.dispatch('runGeolocation')
					store.commit('SET_MAP_TITLE', '[ME]')
					router.push({ name: 'viewMap' }).catch(() => null)
				}
			},
			{
				label: 'Credentials',
				icon: card,
				handler: async () => {
					await menuController.close()
					router.push({ name: 'viewCredentials' }).catch(() => null)
				}
			},
			{
				label: 'About',
				icon: helpCircle,
				handler: async () => {
					await menuController.close()
					router.push({ name: 'viewAbout' }).catch(() => null)
				}
			}
		])

		return {
			menuItems
		}
	}
})
</script>

<style scoped>
	.nav-list {
		padding-right: 20px;
	}
</style>
