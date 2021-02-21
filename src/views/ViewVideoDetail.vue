<template>
	<layout-main :title="title" :back-href="{ name: 'viewVideoList' }">
		<div v-if="model">

			<video v-if="data" :src="data" controls style="width: 100%"></video>
			<media-description :model="model" />

			<media-action-buttons
				@click-facebook="sendToFacebook"
				@click-edit="goToEditPage"
				@click-delete="deleteMediaItem"
			/>

		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { MediaItem } from '@/store/module-storage/module-storage'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
import StoredImage from '@/components/StoredImage.vue'
import GoogleMapHeader from '@/components/map/GoogleMapHeader.vue'
import { confirmDeletion, loadMedia } from '@/utils'
import MediaDescription from '@/components/MediaDescription.vue'
import MediaActionButtons from '@/components/ImageDetailTabs.vue'
import {LoadedMedia} from '@/store/store'
export default defineComponent({
	name: 'ViewVideoDetail',
	components: { StoredImage, GoogleMapHeader, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, MediaActionButtons, MediaDescription },
	setup () {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const id = computed<number>(() => Number(route.params.id))
		const model = ref<MediaItem>(null)
		const title = computed<string>(() => model.value ? model.value.name : '')
		const data = ref<string>(null)

		watch(() => id.value, () => {
			if (route.name !== 'viewVideoDetail') {
				return
			}
			if (id.value) {
				clearTimeout(store.state.timeoutRef)
				model.value = store.state.storage.videos[id.value]
				if (model.value) {
					loadMedia(model.value).then(resp => data.value = resp)
				}
			} else {
				const ref = setTimeout(() => {
					model.value = null
					data.value = null
				}, 300)
				store.commit('SET_TIMEOUT_REF', ref)
			}
		}, { immediate: true })

		const sendToFacebook = () => {
			const loadedMedia: LoadedMedia = {
				id: model.value.id,
				type: 'video',
				data: data.value
			}
			store.commit('LOAD_MEDIA', loadedMedia)
			router.push({ name: 'viewMediaUpload', params: { type: 'video', id: model.value.id } })
		}

		const deleteMediaItem = () => {
			confirmDeletion(() => {
				store.commit('storage/REMOVE_MEDIA_ITEM', model.value)
				router.push({ name: 'viewVideoList' })
			})
		}

		const goToEditPage = (): void => {
			router.push({ name: 'viewMediaEdit', params: { type: 'video', id: model.value.id } })
		}

		return {
			model,
			title,
			data,
			deleteMediaItem,
			goToEditPage,
			sendToFacebook
		}
	}
})
</script>

<style scoped>

</style>
