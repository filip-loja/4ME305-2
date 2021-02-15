<template>
	<layout-main title="Image upload" back>
		<ion-progress-bar type="indeterminate" color="warning" v-if="loading" />
		<div v-if="model">
			<div class="img-preview">
				<ion-img class="img-preview-cmp" :src="model.data" />
				<div class="options">
					<ion-list>
						<ion-item>
							<ion-label>Post text</ion-label>
							<ion-toggle
								@ionChange="useDescription = !useDescription"
								:checked="useDescription === true"
							/>
						</ion-item>

						<ion-item>
							<ion-label>Date</ion-label>
							<ion-toggle
								@ionChange="useDate = !useDate"
								:checked="useDate === true"
							/>
						</ion-item>

						<ion-item>
							<ion-label>Location</ion-label>
							<ion-toggle
								@ionChange="useGeolocation = !useGeolocation"
								:checked="useGeolocation === true"
							/>
						</ion-item>
					</ion-list>
				</div>
			</div>
			<ion-list>
				<ion-item>
					<ion-label position="floating">Post text</ion-label>
					<ion-textarea :rows="6" v-model="description" :disabled="!useDescription" />
				</ion-item>
			</ion-list>
			<div class="ion-padding">
				<ion-button class="taller-btn" expand="block" @click="sendToFacebook" :disabled="loading">Post to Facebook</ion-button>
			</div>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { ImageUpload } from '@/store/store'
import { FacebookPost, loadImage, postToFacebook } from '@/utils'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, alertController, IonProgressBar, IonImg } from '@ionic/vue'

export default defineComponent({
	name: 'ViewImageUpload',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, IonProgressBar, IonImg },
	setup () {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()
		const id = computed<number>(() => Number(route.params.id))
		const model = computed<ImageUpload>(() => store.state.imageUpload)
		const loading = ref<boolean>(false)

		watch(() => id.value, async (newId) => {
			if (newId && (!model.value || model.value.id !== newId)) {
				const tmpModel = store.state.storage.images[newId]
				const data = await loadImage(tmpModel)
				const imageUpload: ImageUpload = {
					...tmpModel,
					data
				}
				store.commit('SET_IMAGE_UPLOAD', imageUpload)
			}
		}, { immediate: true})

		const description = ref<string>(null)
		watch(() => model.value, () => {
			description.value = model.value ? model.value.description : null
		}, { immediate: true})


		const useDescription = ref<boolean>(true)
		const useDate = ref<boolean>(true)
		const useGeolocation = ref<boolean>(true)

		const sendToFacebook = () => {
			let message = ''
			if (useDescription.value) message = description.value + '\n\n'
			if (useDate.value) message = message + 'Date: ' + model.value.date + '\n'
			if (useGeolocation.value && model.value.geolocation) message = message + `Location: ${model.value.geolocation.lat} x ${model.value.geolocation.lon}`

			const post: FacebookPost = {
				image: model.value.data,
				message
			}

			loading.value = true
			postToFacebook(store, post).then(err => {
				loading.value = false
				if (err === null) {
					alertController.create({
						header: 'Upload successful!',
						message: 'Your picture was successfully uploaded to Facebook.',
						backdropDismiss: false,
						buttons: [{
							text: 'Ok',
							handler: () => {
								router.push({ name: 'viewImageDetail', params: { id: model.value.id } })
								// store.commit('SET_IMAGE_UPLOAD', null)
							}
						}]
					}).then(alert => alert.present())
				} else {
					alertController.create({
						header: 'Error!',
						message: err,
						backdropDismiss: false,
						buttons: [{
							text: 'Ok',
							role: 'cancel',
							cssClass: 'warning'
						}]
					}).then(alert => alert.present())
				}
			})
		}

		onBeforeUnmount(() => {
			store.commit('SET_IMAGE_UPLOAD', null)
		})

		return {
			sendToFacebook,
			description,
			useDescription,
			useDate,
			useGeolocation,
			model,
			loading
		}
	}
})
</script>

<style scoped>

	.img-preview {
		display: flex;
		width: 100%;
		align-items: flex-start;
	}

	.img-preview .img-preview-cmp {
		display: block;
		flex: 0 0 115px;
		margin-top: 20px;
		margin-left: 15px;
	}

	.options {
		display: block;
		flex: 1;
		padding-right: 20px;
	}

</style>
