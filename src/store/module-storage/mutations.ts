
import {
	StateStorage,
	ImageItem,
	Credentials,
	EditImage,
	MediaItem
} from '@/store/module-storage/module-storage'

export const HYDRATE = (state: StateStorage, payload: StateStorage): void => {
	Object.assign(state, payload)
}

export const ADD_MEDIA_ITEM = (state: StateStorage, payload: MediaItem): void => {
	if (payload.type === 'video') {
		state.videos[payload.id] = payload
		state.videoId++
	} else {
		state.images[payload.id] = payload as ImageItem // TODO tent as dat potom prec
		state.imageId++
	}
}

export const EDIT_IMAGE_DESCRIPTION = (state: StateStorage, payload: EditImage): void => {
	if (payload.id in state.images) {
		state.images[payload.id].description = payload.description
	}
}

export const REMOVE_MEDIA_ITEM = (state: StateStorage, payload: MediaItem): void => {
	if (payload.type === 'video') {
		if (payload.id in state.videos) {
			delete state.videos[payload.id]
		}
	} else {
		if (payload.id in state.images) {
			delete state.images[payload.id]
		}
	}
}

export const SAVE_CREDENTIALS = (state: StateStorage, payload: Credentials): void => {
	state.credentials = payload
}
