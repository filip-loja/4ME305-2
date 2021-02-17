import { alertController } from '@ionic/vue'
import { Store } from 'vuex'
import { StateRoot, ModulesRef } from '@/store/store'
import { ImageItem } from '@/store/module-storage/module-storage'
import { Filesystem } from '@capacitor/core'

export const withTimeout = (timeout: number, userPromise: Promise<any>): Promise<any> => {
	const checkPromise = new Promise((resolve, reject) => {
		return setTimeout(() => reject('Request timed out'), timeout)
	})
	return Promise.race([checkPromise, userPromise])
}

export const errorAlert = (message: string) => {
	return alertController.create({
		header: 'Error!',
		message,
		backdropDismiss: false,
		buttons: [{
			text: 'Ok',
			role: 'cancel'
		}]
	}).then(alert => alert.present())
}

export const confirmDeletion = async (cb: () => void) => {
	const alert = await alertController
		.create({
			header: 'Please confirm!',
			message: 'Are you sure that you want to permanently delete this image?',
			backdropDismiss: false,
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'warning'
				},
				{
					text: 'Yes',
					handler: () => cb()
				}
			]
		});
	return alert.present()
}

export interface FacebookPost {
	image: string;
	message: string;
}

export const postToFacebook = async (store: Store<StateRoot & ModulesRef>, data: FacebookPost) => {

	const base64Response = await fetch(data.image)
	const blob = await base64Response.blob()

	const formData = new FormData()
	formData.append('access_token', store.state.storage.credentials.facebookToken)
	formData.append('message', data.message)
	formData.append('source', blob)
	const url = `https://graph.facebook.com/${store.state.storage.credentials.facebookPage}/photos`

	const request = fetch(url, { body: formData, method: 'post' })
		.then(response => response.json())
		.then(data => {
			if (data.id) {
				return null
			} else {
				return data.error.message
			}
		})

	return withTimeout(15000, request).catch(e => e)
}

export const loadImage = async (imageItem: ImageItem): Promise<string> => {
	const file = await Filesystem.readFile({
		path: imageItem.path,
		directory: imageItem.directory as any
	})
	return Promise.resolve(`data:image/jpeg;base64,${file.data}`)
}
