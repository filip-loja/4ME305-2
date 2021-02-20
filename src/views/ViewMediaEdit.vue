<template>
	<layout-main title="Edit" back>
		<div>
			<ion-list>
				<ion-item v-if="data.type === 'video'">
					<ion-label position="floating">Name</ion-label>
					<ion-input :rows="10" v-model="data.name" />
				</ion-item>
				<ion-item>
					<ion-label position="floating">Description</ion-label>
					<ion-textarea :rows="10" v-model="data.description" />
				</ion-item>
			</ion-list>
			<div class="ion-padding">
				<ion-button class="taller-btn" expand="block" @click="saveChanges">Save</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { MediaItem, MediaItemUpdate } from '@/store/module-storage/module-storage'

export default defineComponent({
	name: 'ViewMediaEdit',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea },
	setup () {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const data = ref<MediaItemUpdate>({} as MediaItemUpdate)
		const model = ref<MediaItem>(null)
		watch(() => route.params, (newParams) => {
			if (route.name !== 'viewMediaEdit') {
				return
			}

			if (!newParams || !newParams.id || !newParams.type) {
				const ref = setTimeout(() => model.value = null, 300)
				store.commit('SET_TIMEOUT_REF', ref)
				return
			}

			clearTimeout(store.state.timeoutRef)
			const id = Number(route.params.id)
			const type = route.params.type

			if (type === 'video') {
				model.value = store.state.storage.videos[id]
			} else {
				model.value = store.state.storage.images[id] as any // TODO dat prec any
			}

			if (model.value) {
				data.value.id = id
				data.value.type = model.value.type
				data.value.description = model.value.description
				data.value.name = model.value.name
			}
		}, { immediate: true })

		const saveChanges = () => {
			store.commit('storage/EDIT_MEDIA_ITEM', data.value)
			const route = model.value.type === 'video' ? 'viewVideoDetail' : 'viewImageDetail'
			router.push({ name: route, params: { id: model.value.id } })
			// TODO sem dat notifikaciu
		}

		return {
			saveChanges,
			data
		}
	}
})
</script>

<style scoped>

</style>
