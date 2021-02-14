<template>
	<layout-main title="Add a memory">
		<form class="ion-padding">
			<ion-list>
				<ion-item>
					<ion-label position="floating">Title</ion-label>
					<ion-input type="text" required v-model="form.title" />
				</ion-item>

<!--				<ion-item>-->
<!--					<ion-label position="floating">Image URL</ion-label>-->
<!--					<ion-input type="url" required v-model="form.image" />-->
<!--				</ion-item>-->

				<ion-item>
					<ion-thumbnail slot="start">
						<ion-img :src="form.image" />
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
import { defineComponent } from 'vue';
import { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonImg, IonThumbnail } from '@ionic/vue'
import { camera } from 'ionicons/icons'

import {Plugins, CameraResultType, CameraPhoto, FilesystemDirectory } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

// export interface Photo {
// 	filepath: string;
// 	webviewPath?: string;
// }

// const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
// 	const reader = new FileReader;
// 	reader.onerror = reject;
// 	reader.onload = () => {
// 		resolve(reader.result);
// 	};
// 	reader.readAsDataURL(blob);
// });

// const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
//
// 	// Fetch the photo, read as a blob, then convert to base64 format
// 	const response = await fetch(photo.webPath!);
// 	const blob = await response.blob();
// 	const base64Data = await convertBlobToBase64(blob) as string;
//
// 	const savedFile = await Filesystem.writeFile({
// 		path: fileName,
// 		data: base64Data,
// 		directory: FilesystemDirectory.Data
// 	});
//
// 	// Use webPath to display the new image instead of base64 since it's
// 	// already loaded into memory
// 	return {
// 		filepath: fileName,
// 		webviewPath: photo.webPath
// 	};
// }

import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'MemoryForm',
	components: { IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonImg, IonThumbnail },
	setup () {
		const store = useStore()
		const router = useRouter()

		const form = ref({
			title: null,
			image: null,
			description: null
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
				allowEditing: true,
				resultType: CameraResultType.Uri
			})
			form.value.image = image.webPath
		}

		return {
			form,
			icons,
			saveMemory,
			takePhoto
		}
	}
})
</script>

<style scoped>

</style>
