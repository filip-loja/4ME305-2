<template>
	<layout-main title="Facebook upload" back>
		<ion-progress-bar type="indeterminate" color="warning" v-if="loading" />
		<div v-if="model">
			<div class="img-preview">
				<ion-img v-if="model.type === 'image'" class="img-preview-cmp" :src="data.data" />
				<div class="options">
					<ion-list>

						<ion-item v-if="model.type === 'video'">
							<ion-label>Name</ion-label>
							<ion-toggle
								@ionChange="useName = !useName"
								:checked="useName === true"
							/>
						</ion-item>

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
				<ion-item v-if="model.type === 'video'">
					<ion-label position="floating">Video name</ion-label>
					<ion-input v-model="name" :disabled="!useName" />
				</ion-item>
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
import { defineComponent, ref, watch, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { FacebookPost, postToFacebook } from '@/utils'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, alertController, IonProgressBar, IonImg } from '@ionic/vue'
import { MediaItem } from '@/store/module-storage/module-storage'
import {LoadedMedia} from '@/store/store'

export default defineComponent({
	name: 'ViewMediaUpload',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, IonProgressBar, IonImg },
	setup () {
		const store = useStore()
		const router = useRouter()
		const route = useRoute()

		const model = ref<MediaItem>(null)
		const data = ref<LoadedMedia>(null)
		const loading = ref<boolean>(false)
		const description = ref<string>(null)
		const name = ref<string>(null)
		const useDescription = ref<boolean>(true)
		const useDate = ref<boolean>(true)
		const useGeolocation = ref<boolean>(true)
		const useName = ref<boolean>(true)

		watch(() => route.params, (newParams) => {
			if (route.name !== 'viewMediaUpload') {
				return
			}

			if (!newParams || !newParams.id || !newParams.type) {
				const ref = setTimeout(() => {
					model.value = null
					data.value = null
				}, 300)
				store.commit('SET_TIMEOUT_REF', ref)
				return
			}

			clearTimeout(store.state.timeoutRef)
			const id = Number(route.params.id)
			const type = route.params.type
			const storageType = type === 'video' ? 'videos' : 'images'
			model.value = store.state.storage[storageType][id]
			data.value = store.state.loadedMedia

			loading.value = false
			description.value = model.value.description
			name.value = model.value.name
			useDescription.value = true
			useDate.value = true
			useGeolocation.value = true
			useName.value = true
		}, { immediate: true })



		const sendToFacebook = () => {
			let message = ''
			if (useName.value && model.value.type === 'video') message = name.value + '\n\n'
			if (useDescription.value) message = description.value + '\n\n'
			if (useDate.value) message = message + 'Date: ' + model.value.date + '\n'
			if (useGeolocation.value && model.value.geolocation) message = message + `Location: ${model.value.geolocation.lat} x ${model.value.geolocation.lon}`

			const post: FacebookPost = {
				image: data.value.data,
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
			name,
			useDescription,
			useDate,
			useGeolocation,
			useName,
			model,
			loading,
			data
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
