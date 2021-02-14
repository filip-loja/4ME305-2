<template>
	<layout-main title="Add a memory">
		<form class="ion-padding">
			<ion-list>
				<ion-item>
					<ion-label position="floating">Title</ion-label>
					<ion-input type="text" required v-model="form.title" />
				</ion-item>

				<ion-item>
					<ion-thumbnail slot="start">
						<ion-img :src="thumbnail" />
					</ion-thumbnail>
					<ion-button fill="clear" type="button" @click="takePhoto">
						<ion-icon :icon="icons.camera" slot="start" />
						Take a photo
					</ion-button>
				</ion-item>

				<ion-item>
					<ion-label position="floating">Description</ion-label>
					<ion-textarea rows="5" v-model="form.description" />
				</ion-item>
			</ion-list>

		</form>

		<ion-button expand="block" @click="saveMemory">Save</ion-button>

	</layout-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonImg, IonThumbnail } from '@ionic/vue'
import { camera } from 'ionicons/icons'

import {Plugins, CameraResultType, CameraPhoto, FilesystemDirectory } from '@capacitor/core'
const { Camera, Filesystem } = Plugins


export default defineComponent({
	name: 'MemoryForm',
	components: { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonImg, IonThumbnail },
	setup () {
		const store = useStore()
		const router = useRouter()

		const thumbnail = ref(null)
		const form = ref({
			title: null,
			image: null,
			description: null,
		})

		const icons = {
			camera
		}

		const saveMemory = (): void => {
			store.dispatch('addMemory', form.value)
			router.replace({name: 'root'})
		}

		const takePhoto = async (): Promise<void> => {
			const image: CameraPhoto = await Camera.getPhoto({
				quality: 70,
				allowEditing: false,
				resultType: CameraResultType.Base64
			})

			const fileName = Date.now() + '.' + image.format

			await Filesystem.writeFile({
				data: image.base64String,
				path: fileName,
				directory: FilesystemDirectory.Data
			})

			// const file = await Filesystem.readFile({
			// 	path: fileName,
			// 	directory: FilesystemDirectory.Data
			// });

			// form.value.image = `data:image/jpeg;base64,${file.data}`
			form.value.image = { path: fileName, directory: FilesystemDirectory.Data }
			thumbnail.value = `data:image/jpeg;base64,${image.base64String}`
		}

		return {
			form,
			icons,
			thumbnail,
			saveMemory,
			takePhoto
		}
	}
})
</script>

<style scoped>

</style>
