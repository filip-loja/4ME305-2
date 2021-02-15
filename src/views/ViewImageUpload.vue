<template>
	<layout-main title="Image upload">
		<ion-progress-bar type="indeterminate" color="warning" v-if="loading" />
		<div v-if="model">
			<ion-list>
				<ion-item>
					<ion-label position="floating">Description</ion-label>
					<ion-textarea :rows="6" v-model="description" :disabled="!useDescription" />
				</ion-item>

				<ion-item>
					<ion-label>Include description</ion-label>
					<ion-toggle
						@ionChange="useDescription = !useDescription"
						:checked="useDescription === true"
					/>
				</ion-item>

				<ion-item>
					<ion-label>Include date</ion-label>
					<ion-toggle
						@ionChange="useDate = !useDate"
						:checked="useDate === true"
					/>
				</ion-item>

				<ion-item>
					<ion-label>Include geolocation</ion-label>
					<ion-toggle
						@ionChange="useGeolocation = !useGeolocation"
						:checked="useGeolocation === true"
					/>
				</ion-item>

				<br /><br />
				<ion-button class="taller-btn" expand="block" @click="sendToFacebook" :disabled="loading">Post to Facebook</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ImageUpload } from '@/store/store'
import {FacebookPost, postToFacebook} from '@/utils'
import {IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, alertController, IonProgressBar} from '@ionic/vue'

export default defineComponent({
	name: 'ViewImageUpload',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonToggle, IonProgressBar },
	setup () {
		const store = useStore()
		const router = useRouter()
		const model = computed<ImageUpload>(() => store.state.imageUpload)
		const description = ref<string>(model.value.description)
		const loading = ref<boolean>(false)

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
								store.commit('SET_IMAGE_UPLOAD', null)
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

</style>
