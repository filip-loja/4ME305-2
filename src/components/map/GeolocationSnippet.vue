<template>
	<div class="geolocation">
		<google-map-header :lat="lat" :lon="lon" :icon="locate" @click="refreshGoogleMap" />
		<google-map width="100%" height="100%" :key="googleMapKey" :lat="lat" :lon="lon" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GoogleMap from '@/components/map/GoogleMap.vue'
import GoogleMapHeader from '@/components/map/GoogleMapHeader.vue'
import { locate } from 'ionicons/icons'
export default defineComponent({
	name: 'GeolocationSnippet',
	components: { GoogleMap, GoogleMapHeader },
	props: {
		lat: { type: Number, default: 0 },
		lon: { type: Number, default: 0 }
	},
	setup () {
		const googleMapKey = ref(1)
		const refreshGoogleMap = () => googleMapKey.value++

		return {
			googleMapKey,
			refreshGoogleMap,
			locate
		}
	}
})
</script>

<style scoped>
	.geolocation {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
	}
</style>
