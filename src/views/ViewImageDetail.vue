<template>
	<layout-main :title="title">
		<div v-if="model">
			<stored-image :source="imageSource" />
			<div>
				Date: {{ model.date }}
			</div>
			<google-map-header
				v-if="model.geolocation"
				:lat="model.geolocation.lat"
				:lon="model.geolocation.lon"
				:icon="map"
			/>
			<div>
				<div>Description</div>
				<div>{{ model.description }}</div>
			</div>
			<ion-button @click="deleteImage">Delete</ion-button>
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
import { confirmDeletion } from '@/utils'

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

		return {
			model,
			imageSource,
			deleteImage,
			title,
			map
		}
	}
})
</script>

<style scoped>

</style>
