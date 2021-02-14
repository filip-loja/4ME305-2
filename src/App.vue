<template>
	<ion-app>
		<ion-router-outlet/>
	</ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { loadState } from '@/store/persistent'
import { IonApp, IonRouterOutlet } from '@ionic/vue'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet },
	setup () {
		const store = useStore()
		loadState().then(res => {
			if (res.success) {
				store.commit('storage/HYDRATE', res.vuexContent)
			}
		})
	}
})
</script>
