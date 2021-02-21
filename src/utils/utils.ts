import { alertController } from '@ionic/vue'
import { MediaItem } from '@/store/module-storage/module-storage'
import { FilesystemDirectory, Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

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
			message: 'Are you sure that you want to permanently delete this item?',
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

export const convertToBlob = async (data: string): Promise<Blob> => {
	const base64Response = await fetch(data)
	return await base64Response.blob()
}

export const loadMedia = (mediaItem: MediaItem): Promise<string> => {
	if (!mediaItem.type) mediaItem.type = 'image' // TODO toto potom vyhodit
	const types = {
		image: 'data:image/jpeg;base64,',
		video: 'data:video/mp4;base64,'
	}
	return Filesystem.readFile({
		path: mediaItem.path,
		directory: FilesystemDirectory.Data
	}).then(file => `${types[mediaItem.type]}${file.data}`)
}

export const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.onerror = () => reject(null)
	reader.onload = () => resolve(reader.result)
	reader.readAsDataURL(blob)
})

export const getDate = () => {
	return (new Date()).toString().split('(')[0].trim()
}


/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param dp Number of decimal places to display.
 * @see https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/14919494
 *
 * @return Formatted string.
 */
export const humanFileSize = (bytes: number, dp = 1): string =>  {
	if (!bytes) {
		return '-'
	}

	const thresh = 1024

	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}

	const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	let u = -1
	const r = 10 ** dp

	do {
		bytes /= thresh
		++u
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)


	return bytes.toFixed(dp) + ' ' + units[u]
}
