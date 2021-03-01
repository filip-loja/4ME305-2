<template>
	<layout-main :title="title" :back-href="{ name: 'viewImageList' }">
		<div v-if="model">
			<stored-image :model="model" @load="setImageData" />
			<media-description :model="model" />
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
import { MediaItem } from '@/store/module-storage/module-storage'
import StoredImage from '@/components/StoredImage.vue'
import ImageDetailTabs from '@/components/ImageDetailTabs.vue'
import MediaDescription from '@/components/MediaDescription.vue'
import { map } from 'ionicons/icons'
import { confirmDeletion } from '@/utils/utils'
import {LoadedMedia} from '@/store/store'

export default defineComponent({
	name: 'ViewImageDetail',
	components: { StoredImage, ImageDetailTabs, MediaDescription },
	setup () {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()

		const id = computed<number>(() => Number(route.params.id))
		const model = ref<MediaItem>(null)
		const title = computed<string>(() => model.value ? model.value.path : '')
		const imageData = ref<string>(null)

		watch(() => id.value, () => {
			if (route.name !== 'viewImageDetail') {
				return
			}
			if (id.value) {
				clearTimeout(store.state.timeoutRef)
				model.value = store.state.storage.images[id.value]
			} else {
				const ref = setTimeout(() => model.value = null, 300)
				store.commit('SET_TIMEOUT_REF', ref)
			}
		}, { immediate: true })

		const deleteImage = () => {
			confirmDeletion(() => {
				store.commit('storage/REMOVE_MEDIA_ITEM', model.value)
				router.push({ name: 'viewImageList' })
			})
		}

		const sendToFacebook = () => {
			const loadedMedia: LoadedMedia = {
				id: model.value.id,
				type: 'image',
				data: imageData.value
			}
			store.commit('LOAD_MEDIA', loadedMedia)
			router.push({ name: 'viewMediaUpload', params: { type: 'image', id: model.value.id } })
		}

		const setImageData = (data: string): void => {
			imageData.value = data
		}

		const goToEditPage = (): void => {
			router.push({ name: 'viewMediaEdit', params: { type: 'image', id: model.value.id } })
		}

		return {
			model,
			deleteImage,
			title,
			map,
			sendToFacebook,
			setImageData,
			goToEditPage
		}
	}
})
</script>

<style scoped>

</style>
