<template>
	<layout-main title="My location">
		<ion-refresher slot="fixed" id="refresher" @ionRefresh="doRefresh($event)">
			<ion-refresher-content />
		</ion-refresher>

		<ion-progress-bar v-if="loading" type="indeterminate" />
		<template v-else>
			<geolocation-snippet v-if="success && geo" :lat="geo.lat" :lon="geo.lon" />
			<p v-else>Geolocation is unavailable</p>
		</template>

	</layout-main>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onBeforeUnmount} from 'vue'
import { IonProgressBar, IonRefresher, IonRefresherContent } from '@ionic/vue'
import { useStore } from '@/store'
import { Geo, GeoResult } from '@/store/store'

import GeolocationSnippet from '@/components/map/GeolocationSnippet.vue'

export default defineComponent({
	name: 'GeolocationView',
	components: { IonProgressBar, IonRefresher, IonRefresherContent, GeolocationSnippet },
	setup () {

		const store = useStore()
		const loading = ref<boolean>(true)
		const success = ref<boolean>(false)

		const geo = computed<Geo>(() => store.state.geolocation)

		const runGeolocation = (cb: () => any = null): void => {
			store.dispatch('runGeolocation').then((res: GeoResult) => {
				success.value = res.success
				loading.value = false
				if (cb) cb()
			})
		}
		runGeolocation()

		onBeforeUnmount(() => store.commit('SET_GEOLOCATION', null))

		const doRefresh = (event: any) => {
			store.commit('SET_GEOLOCATION', null)
			loading.value = true
			runGeolocation(() => event.target.complete())
		}

		return {
			loading,
			success,
			geo,
			doRefresh
		}
	}
})
</script>

<style scoped>

</style>
