<template>
	<layout-main title="Geolocation">
		<ion-button expand="block" @click="getLocation">Show my location</ion-button>
		<ul v-if="lat && lon">
			<li>Latitude: {{ lat }}</li>
			<li>Longitude: {{ lon }}</li>
		</ul>
		<p v-if="error">{{ error }}</p>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton} from '@ionic/vue'

import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

interface Data {
	lat: number;
	lon: number;
	error: string;
}

export default defineComponent({
	name: 'GeolocationView',
	components: {
		IonButton
	},
	data (): Data {
		return {
			lat: null,
			lon: null,
			error: null
		}
	},
	methods: {
		getLocation (): void {
			Geolocation.getCurrentPosition().then(resp => {
				this.lat = resp.coords.latitude
				this.lon = resp.coords.longitude
			}).catch(err => {
				this.error = err
			})
		}
	}
})
</script>

<style scoped>

</style>
