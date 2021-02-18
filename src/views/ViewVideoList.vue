<template>
	<layout-main title="Videos">
		<ion-list>

			<ion-item v-for="item in itemList" :key="item.id" @touchend="showDetail(item.id)">
				<ion-label>
					<h2>{{ item.path }}</h2>
					<h3>{{ item.date }}</h3>
				</ion-label>
			</ion-item>

		</ion-list>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {useStore} from '@/store'
import {useRouter} from 'vue-router'
import {MediaItem} from '@/store/module-storage/module-storage'
import { IonList, IonItem, IonLabel } from '@ionic/vue'
export default defineComponent({
	name: 'ViewVideoList',
	components: { IonList, IonItem, IonLabel },
	setup () {
		const store = useStore()
		const router = useRouter()
		const itemList = computed<MediaItem[]>(() => store.getters['storage/videoList'])

		const showDetail = (id: number) => {
			router.push({name: 'viewVideoDetail', params: {id}})
		}

		return {
			itemList,
			showDetail
		}
	}
})
</script>

<style scoped>

</style>
