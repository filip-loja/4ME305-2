<template>
	<layout-main :title="title">
		<div v-if="model">
			<stored-image :source="imageSource" @load="setImageData" />

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

			<image-detail-tabs
				@click-facebook="sendToFacebook"
				@click-edit="goToEditPage"
				@click-delete="deleteImage"
			/>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ImageItem } from '@/store/module-storage/module-storage'
import StoredImage, { ImageSource } from '@/components/StoredImage.vue'
import GoogleMapHeader from '@/components/map/GoogleMapHeader.vue'
import ImageDetailTabs from '@/components/ImageDetailTabs.vue'
import { map } from 'ionicons/icons'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
import { confirmDeletion } from '@/utils'
import { ImageUpload } from '@/store/store'

export default defineComponent({
	name: 'ViewImageDetail',
	components: { StoredImage, GoogleMapHeader, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, ImageDetailTabs },
	setup () {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const id = computed<number>(() => Number(route.params.id))
		const model = ref<ImageItem>(null)
		const title = computed<string>(() => model.value ? model.value.path : '')
		const imageData = ref<string>(null)

		watch(() => id, () => {
			if (id.value) {
				model.value = store.state.storage.images[id.value]
			} else {
				setTimeout(() => model.value = null, 500)
			}
		}, { immediate: true })

		const imageSource = computed<ImageSource>(() => {
			return {
				path: model.value.path,
				directory: model.value.directory,
			}
		})

		const deleteImage = () => {
			confirmDeletion(() => {
				store.commit('storage/REMOVE_IMAGE', model.value.id)
				router.push({ name: 'viewImageList' })
			})
		}

		const showMap = async () => {
			store.commit('SET_MAP_TITLE', model.value.path)
			store.commit('SET_GEOLOCATION', model.value.geolocation)
			router.push({ name: 'viewMap' }).catch(() => null)
		}

		const sendToFacebook = () => {
			const imageUpload: ImageUpload = {
				...model.value,
				data: imageData.value
			}
			store.commit('SET_IMAGE_UPLOAD', imageUpload)
			router.push({ name: 'viewImageUpload', params: { id: model.value.id } })
		}

		const setImageData = (data: string): void => {
			imageData.value = data
		}

		const goToEditPage = () => {
			router.push({ name: 'viewImageEdit', params: { id: model.value.id } })
		}

		return {
			model,
			imageSource,
			deleteImage,
			title,
			map,
			showMap,
			sendToFacebook,
			setImageData,
			goToEditPage
		}
	}
})
</script>

<style scoped>

</style>
