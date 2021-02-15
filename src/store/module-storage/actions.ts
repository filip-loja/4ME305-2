import { ActionContext } from 'vuex';
import { StateRoot } from '@/store/store'
import { StateStorage, ImageItem } from '@/store/module-storage/module-storage'
import { Plugins, CameraResultType, CameraPhoto, FilesystemDirectory } from '@capacitor/core'
const { Camera, Filesystem } = Plugins

type A = ActionContext<StateStorage, StateRoot>

export const addImage = (context: A, payload: ImageItem) => {
	payload.id = Date.now()
	context.commit('ADD_IMAGE', payload)
}

export const removeImage = (context: A, id: number): Promise<boolean> => {
	if (id in context.state.images) {
		context.commit('REMOVE_IMAGE', id)
		return Promise.resolve(true)
	} else {
		return Promise.resolve(false)
	}
}

export const takePicture = async (context: A): Promise<number> => {
	await context.dispatch('runGeolocation', null, { root: true })

	const image: CameraPhoto = await Camera.getPhoto({
		quality: 70,
		allowEditing: false,
		resultType: CameraResultType.Base64
	})

	const fileName = Date.now() + '.' + image.format
	const directory = FilesystemDirectory.Data

	await Filesystem.writeFile({
		data: image.base64String,
		path: fileName,
		directory
	})

	const imageItem: ImageItem = {
		id: context.state.imageId,
		date: (new Date()).toUTCString(),
		description: null,
		path: fileName,
		directory: directory,
		geolocation: { ...context.rootState.geolocation }
	}

	context.commit('ADD_IMAGE', imageItem)

	return Promise.resolve(imageItem.id)
}

