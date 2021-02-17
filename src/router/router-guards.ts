import { RouteLocationNormalized } from 'vue-router'
import { loadImage } from '@/utils'
import { ImageUpload } from '@/store/store'
import store from '@/store'

export const imageUploadGuard = (targetRoute: RouteLocationNormalized): Promise<boolean|string> => {
	const id = Number(targetRoute.params.id)
	if (store.state.imageUpload === null || store.state.imageUpload.id !== id) {
		const tmpModel = store.state.storage.images[id]
		return loadImage(tmpModel).then(data => {
			const imageUpload: ImageUpload = { ...tmpModel, data }
			store.commit('SET_IMAGE_UPLOAD', imageUpload)
			return true
		})
	} else {
		return Promise.resolve(true)
	}
}
