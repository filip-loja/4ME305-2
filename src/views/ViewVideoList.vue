<template>
	<layout-main title="Videos">
		<ion-list class="video-list">

			<ion-item v-for="item in itemList" :key="item.id">
				<touch-support @press="showDetail(item.id)" @long-press="showActionSheet(item)">
					<ion-label class="video-list__item">
						<ion-icon :icon="film" size="large" />
						<div class="ion-padding-start">
							<h2><span>{{ item.name }}</span> <small>[{{ $filters.size(item.size) }}]</small></h2>
							<h3>{{ item.date }}</h3>
						</div>
					</ion-label>
				</touch-support>
			</ion-item>

		</ion-list>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { MediaItem } from '@/store/module-storage/module-storage'
import { IonList, IonItem, IonLabel, IonIcon, actionSheetController } from '@ionic/vue'
import {close, eye, film, logoFacebook, pencil, trash} from 'ionicons/icons'
import TouchSupport from '@/components/TouchSupport.vue'
import {confirmDeletion} from '@/utils'
export default defineComponent({
	name: 'ViewVideoList',
	components: { IonList, IonItem, IonLabel, IonIcon, TouchSupport },
	setup () {
		const store = useStore()
		const router = useRouter()
		const itemList = computed<MediaItem[]>(() => store.getters['storage/videoList'])

		const showDetail = (id: number) => {
			router.push({name: 'viewVideoDetail', params: {id}})
		}

		const showActionSheet = async (item: MediaItem) => {
			const actionSheet = await actionSheetController.create({
				header: 'Actions',
				buttons: [
					{
						text: 'Open Video',
						icon: eye,
						handler: () => showDetail(item.id),
					},
					{
						text: 'Edit Video',
						icon: pencil,
						handler: () => {
							console.log('NOT IMPLEMENTED')
							// router.push({ name: 'viewImageEdit', params: { id } })
						}
					},
					{
						text: 'Post to Facebook',
						icon: logoFacebook,
						handler: () => {
							console.log('NOT IMPLEMENTED')
							// router.push({ name: 'viewImageUpload', params: { id } })
						}
					},
					{
						text: 'Delete Video',
						role: 'destructive',
						icon: trash,
						handler: () => confirmDeletion(() => store.commit('storage/REMOVE_MEDIA_ITEM', item)),
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
			itemList,
			showDetail,
			showActionSheet,
			film
		}
	}
})
</script>

<style scoped>

	.video-list {
		padding-right: 20px;
	}

	.video-list__item {
		display: flex;
		align-items: center;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.video-list__item h2 span {
		font-weight: bold;
		color: var(--ion-color-dark-tint)
	}

	.video-list__item h2 small {
		padding-left: 5px;
		color: var(--ion-color-medium-tint);
	}

	.video-list__item h3 {
		color: var(--ion-color-medium-shade)
	}

	.video-list__item ion-icon {
		color: var(--ion-color-dark-tint)
	}

</style>
