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
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect } from '@ionic/vue'
import navigation from '@/navigation'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonRippleEffect },
	setup () {
		const store = useStore()
		const router = useRouter()
		const menuItems = ref(navigation(router, store))
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
