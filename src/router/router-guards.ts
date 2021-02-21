import { RouteLocationNormalized } from 'vue-router'
import { loadMedia } from '@/utils/utils'
import { LoadedMedia } from '@/store/store'
import { MediaItem } from '@/store/module-storage/module-storage'
import store from '@/store'

export const imageUploadGuard = (targetRoute: RouteLocationNormalized): Promise<boolean|string> => {
	const id = Number(targetRoute.params.id)
	const type = targetRoute.params.type
	if (store.state.loadedMedia === null || store.state.loadedMedia.id !== id) {
		const storageType = type === 'video' ? 'videos' : 'images'
		const model: MediaItem = store.state.storage[storageType][id]
		return loadMedia(model).then(data => {
			const loadedMedia: LoadedMedia = {
				id: model.id,
				type: model.type,
				data
			}
			store.commit('LOAD_MEDIA', loadedMedia)
			return true
		})
	} else {
		return Promise.resolve(true)
	}
}
