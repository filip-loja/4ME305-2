import { ActionContext } from 'vuex';
import { StateRoot } from '@/store/store'
import {StateStorage, MediaItem} from '@/store/module-storage/module-storage'
import { Plugins, CameraResultType, CameraPhoto, FilesystemDirectory } from '@capacitor/core'
import {convertBlobToBase64, getDate} from '@/utils'
const { Camera, Filesystem } = Plugins

type A = ActionContext<StateStorage, StateRoot>

export const takePicture = async (context: A): Promise<number> => {
	await context.dispatch('runGeolocation', null, { root: true })

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

	const imageItem: MediaItem = {
		id: context.state.imageId,
		type: 'image',
		date: (new Date()).toString().split('(')[0].trim(),
		description: null,
		path: fileName,
		geolocation: { ...context.rootState.geolocation }
	}

	context.commit('ADD_MEDIA_ITEM', imageItem)

	return Promise.resolve(imageItem.id)
}

export const saveVideo = async (context: A, blob: Blob): Promise<string|number> => {
	await context.dispatch('runGeolocation', null, { root: true })
	const fileName = Date.now() + '.mp4'
	const base64Data = await convertBlobToBase64(blob) as string
	const mediaItem: MediaItem = {
		id: context.state.videoId,
		name: fileName,
		path: fileName,
		type: 'video',
		date: getDate(),
		description: null,
		geolocation: { ...context.rootState.geolocation },
		size: blob.size
	}

	try {
		await Filesystem.writeFile({
			path: fileName,
			data: base64Data,
			directory: FilesystemDirectory.Data
		})
		context.commit('ADD_MEDIA_ITEM', mediaItem)
		return Promise.resolve(mediaItem.id)
	} catch (e) {
		return Promise.resolve(e)
	}

}

