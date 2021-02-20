import { RouteLocationNormalized } from 'vue-router'
import { loadMedia } from '@/utils'
import { ImageUpload } from '@/store/store'
import store from '@/store'

export const imageUploadGuard = (targetRoute: RouteLocationNormalized): Promise<boolean|string> => {
	const id = Number(targetRoute.params.id)
	if (store.state.imageUpload === null || store.state.imageUpload.id !== id) {
		const tmpModel = store.state.storage.images[id]
		// TODO odastranit as any
		return loadMedia(tmpModel as any).then(data => {
			const imageUpload: ImageUpload = { ...tmpModel, data }
			store.commit('SET_IMAGE_UPLOAD', imageUpload)
			return true
		})
	} else {
		return Promise.resolve(true)
	}
}
