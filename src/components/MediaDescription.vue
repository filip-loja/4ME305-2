<template>
	<div v-if="model">
		<ion-card v-if="model.geolocation">
			<ion-card-header>
				<ion-card-subtitle><b>Location:</b></ion-card-subtitle>
			</ion-card-header>
			<ion-card-content>
				<google-map-header
					style="padding: 0"
					:lat="model.geolocation.lat"
					:lon="model.geolocation.lon"
					:icon="map"
					@click="showMap"
				/>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-header>
				<ion-card-subtitle><b>Date:</b></ion-card-subtitle>
			</ion-card-header>
			<ion-card-content>
				{{ model.date }}
			</ion-card-content>
		</ion-card>

		<ion-card v-if="model.description">
			<ion-card-header>
				<ion-card-subtitle><b>Description: </b></ion-card-subtitle>
			</ion-card-header>
			<ion-card-content style="white-space: pre-line">
				{{ model.description }}
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/vue'
import { map } from 'ionicons/icons'
import { MediaItem } from '@/store/module-storage/module-storage'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import GoogleMapHeader from '@/components/map/GoogleMapHeader.vue'
export default defineComponent({
	name: 'MediaDescription',
	components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, GoogleMapHeader },
	props: {
		model: { type: Object as PropType<MediaItem>, default: null }
	},
	setup (props) {
		const store = useStore()
		const router = useRouter()

		const showMap = async () => {
			store.commit('SET_MAP_TITLE', props.model.path)
			store.commit('SET_GEOLOCATION', props.model.geolocation)
			router.push({ name: 'viewMap' }).catch(() => null)
		}

		return {
			showMap,
			map
		}
	}
})
</script>

<style scoped>

</style>
