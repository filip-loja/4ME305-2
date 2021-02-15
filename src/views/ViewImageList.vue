<template>
	<layout-main title="Gallery">
		<ion-grid>
			<ion-row>
				<ion-col size="4" v-for="img in imageList" :key="img.id">
					<div class="ion-activatable ripple-parent">
						<stored-image
							:source="{ path: img.path, directory: img.directory }"
							@long-press="showActionSheet(img.id)"
							@press="showImageDetail(img.id)"
						/>
						<ion-ripple-effect />
					</div>
				</ion-col>
			</ion-row>
		</ion-grid>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ImageItem } from '@/store/module-storage/module-storage'
import { IonGrid, IonRow, IonCol, IonRippleEffect, actionSheetController } from '@ionic/vue'
import StoredImage from '@/components/StoredImage.vue'
import { close, trash, logoFacebook, eye } from 'ionicons/icons'
import { confirmDeletion } from '@/utils'

export default defineComponent({
	name: 'ViewImageList',
	components: { StoredImage, IonGrid, IonRow, IonCol, IonRippleEffect },
	setup () {
		const store = useStore()
		const router = useRouter()
		const imageList = computed<ImageItem[]>(() => store.getters['storage/imageList'])

		const showImageDetail = (imageId: number) => router.push({ name: 'viewImageDetail', params: { id: imageId } })

		const showActionSheet = async (id: number) => {
			const actionSheet = await actionSheetController.create({
				header: 'Actions',
				cssClass: 'my-custom-class',
				buttons: [
					{
						text: 'View Image',
						icon: eye,
						handler: () => showImageDetail(id),
					},
					{
						text: 'Post to Facebook',
						icon: logoFacebook,
						handler: () => {
							router.push({ name: 'viewImageUpload', params: { id } })
						}
					},
					{
						text: 'Delete Image',
						role: 'destructive',
						icon: trash,
						handler: () => confirmDeletion(() => store.commit('storage/REMOVE_IMAGE', id)),
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
