<template>
	<ion-app v-if="!loading">

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

		<ion-router-outlet/>

	</ion-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { loadState } from '@/store/persistent'
import { useRouter } from 'vue-router'
import { IonApp, IonRouterOutlet, menuController, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect } from '@ionic/vue'
import { home, helpCircle, map, card, camera } from 'ionicons/icons'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect },
	setup () {
		const store = useStore()
		const router = useRouter()
		const loading = ref(true)

		loadState().then(res => {
			loading.value = false
			if (res.success) {
				store.commit('storage/HYDRATE', res.vuexContent)
			}
		})

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
					router.push({ name: 'viewAbout' }).catch(() => null)
					await menuController.close()
				}
			}
		])

		return {
			loading,
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
