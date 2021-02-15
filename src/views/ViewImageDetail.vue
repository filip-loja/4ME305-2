<template>
	<layout-main :title="title">
		<div v-if="model">
			<stored-image :source="imageSource" @load="setImageData" />
			<div>
				Date: {{ model.date }}
			</div>
			<google-map-header
				v-if="model.geolocation"
				:lat="model.geolocation.lat"
				:lon="model.geolocation.lon"
				:icon="map"
				@click="showMap"
			/>
			<div>
				<div>Description</div>
				<div>{{ model.description }}</div>
			</div>
			<ion-button @click="deleteImage">Delete</ion-button>
			<ion-button :router-link="{name: 'viewImageEdit', params: {id: model.id}}">Edit description</ion-button>
			<ion-button @click="sendToFacebook">Post to Facebook</ion-button>
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
import { map } from 'ionicons/icons'
import { IonButton } from '@ionic/vue'
import {confirmDeletion, FacebookPost} from '@/utils'
import { postToFacebook } from '@/utils'
import {ImageUpload} from '@/store/store'

export default defineComponent({
	name: 'ViewImageDetail',
	// eslint-disable-next-line vue/no-unused-components
	components: { StoredImage, GoogleMapHeader, IonButton },
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
			// let message = model.value.description + '\n\nDate: ' + model.value.date
			// if (model.value.geolocation) {
			// 	message = message + `\nLocation: ${model.value.geolocation.lat} x ${model.value.geolocation.lon}`
			// }
			//
			// const post: FacebookPost = {
			// 	image: imageData.value,
			// 	message
			// }
			// postToFacebook(store, post).then(resp => {
			// 	console.log('-'.repeat(20))
			// 	console.log(resp)
			// })
		}

		const setImageData = (data: string): void => {
			imageData.value = data
		}

		return {
			model,
			imageSource,
			deleteImage,
			title,
			map,
			showMap,
			sendToFacebook,
			setImageData
		}
	}
})
</script>

<style scoped>

</style>