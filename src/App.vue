<template>
	<ion-app>
		<ion-router-outlet/>
	</ion-app>
</template>

<script lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue'
import {defineComponent} from 'vue'
import { loadState } from '@/store'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet },
	setup() {
		const store = useStore()
		loadState().then(res => {
			if (res.success) {
				store.commit('HYDRATE', res.vuexContent)
			}
		})
	}
})
</script>
