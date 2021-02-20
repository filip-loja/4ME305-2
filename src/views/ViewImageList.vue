<template>
	<layout-main title="Images">
		<ion-grid>
			<ion-row>
				<ion-col size="4" v-for="img in imageList" :key="img.id" style="padding: 0">
					<touch-support
						@long-press="showActionSheet(img)"
						@press="showImageDetail(img.id)"
					>
						<media-thumbnail type="image">
							<stored-image :model="img" />
						</media-thumbnail>
					</touch-support>
				</ion-col>
			</ion-row>
		</ion-grid>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { MediaItem } from '@/store/module-storage/module-storage'
import { IonGrid, IonRow, IonCol, IonRippleEffect, actionSheetController } from '@ionic/vue'
import StoredImage from '@/components/StoredImage.vue'
import MediaThumbnail from '@/components/MediaThumbnail.vue'
import TouchSupport from '@/components/TouchSupport.vue'
import { close, trash, logoFacebook, eye, pencil } from 'ionicons/icons'
import { confirmDeletion } from '@/utils'

export default defineComponent({
	name: 'ViewImageList',
	components: { StoredImage, IonGrid, IonRow, IonCol, IonRippleEffect, MediaThumbnail, TouchSupport },
	setup () {
		const store = useStore()
		const router = useRouter()
		const imageList = computed<MediaItem[]>(() => store.getters['storage/imageList'])

		const showImageDetail = (imageId: number) => router.push({ name: 'viewImageDetail', params: { id: imageId } })

		const showActionSheet = async (image: MediaItem) => {
			const actionSheet = await actionSheetController.create({
				header: 'Actions',
				buttons: [
					{
						text: 'View Image',
						icon: eye,
						handler: () => showImageDetail(image.id),
					},
					{
						text: 'Edit Image',
						icon: pencil,
						handler: () => {
							router.push({ name: 'viewMediaEdit', params: { type: 'image', id: image.id } })
						}
					},
					{
						text: 'Post to Facebook',
						icon: logoFacebook,
						handler: () => {
							router.push({ name: 'viewImageUpload', params: { id: image.id } })
						}
					},
					{
						text: 'Delete Image',
						role: 'destructive',
						icon: trash,
						handler: () => confirmDeletion(() => store.commit('storage/REMOVE_MEDIA_ITEM', image)),
					},
					{
						text: 'Cancel',
						icon: close,
						role: 'cancel',
					},
				],
			})
			return actionSheet.present()
		}

		return {
			imageList,
			showActionSheet,
			showImageDetail
		}
	}
})
</script>

<style scoped>

</style>
