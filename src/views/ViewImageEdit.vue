<template>
	<layout-main title="Edit image" back>
		<div>
			<ion-list>
				<ion-item>
					<ion-label position="floating">Description</ion-label>
					<ion-textarea :rows="10" v-model="data" />
				</ion-item>
			</ion-list>
			<div class="ion-padding">
				<ion-button class="taller-btn" expand="block" @click="saveChanges">Save</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea } from '@ionic/vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { EditImage, ImageItem } from '@/store/module-storage/module-storage'

export default defineComponent({
	name: 'ViewImageEdit',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea },
	setup () {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const id = computed<number>(() => Number(route.params.id))
		const model = computed<ImageItem>(() => store.state.storage.images[id.value])
		const data = ref<string>(model.value.description)

		const saveChanges = () => {
			const payload: EditImage = { id: id.value, description: data.value }
			store.commit('storage/EDIT_IMAGE_DESCRIPTION', payload)
			router.push({ name: 'viewImageDetail', params: { id: id.value } })
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
