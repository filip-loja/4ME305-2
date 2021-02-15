<template>
	<layout-main :title="title" back>
		<ion-refresher slot="fixed" id="refresher" @ionRefresh="refreshMap($event)">
			<ion-refresher-content />
		</ion-refresher>
		<geolocation-snippet v-if="geo" :lat="geo.lat" :lon="geo.lon" />
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Geo } from '@/store/store'
import { alertController, IonRefresher, IonRefresherContent } from '@ionic/vue'
import GeolocationSnippet from '@/components/map/GeolocationSnippet.vue'

export default defineComponent({
	name: 'ViewMap',
	components: { GeolocationSnippet, IonRefresher, IonRefresherContent },
	setup () {
		const store = useStore()
		const router = useRouter()

		const geo = computed<Geo>(() => store.state.geolocation)
		const title = computed<string>(() => store.state.mapTitle)
		const loading = ref<boolean>(false)

		watch(() => geo, async (newGeo) => {
			if (!newGeo.value && !loading.value) {
				const alert = await alertController.create({
						header: 'Google map unavailable!',
						message: 'Please check your geolocation settings and try again.',
						buttons: [
							{ text: 'Ok', handler: () => router.back() }
						],
					})
				return alert.present()
			}
		}, { immediate: true })

		const refreshMap = async (event: any) => {
			loading.value = true
			await store.dispatch('runGeolocation')
			event.target.complete()
			loading.value = false
		}

		return {
			geo,
			title,
			refreshMap
		}
	}
})
</script>

<style scoped>

</style>
