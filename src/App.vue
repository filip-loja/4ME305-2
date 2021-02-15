<template>
	<ion-app v-if="!loading">
		<ion-router-outlet/>
	</ion-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { loadState } from '@/store/persistent'
import { IonApp, IonRouterOutlet } from '@ionic/vue'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet },
	setup () {
		const store = useStore()
		const loading = ref(true)
		loadState().then(res => {
			loading.value = false
			if (res.success) {
				store.commit('storage/HYDRATE', res.vuexContent)
			}
		})
		return {
			loading
		}
	}
})
</script>
