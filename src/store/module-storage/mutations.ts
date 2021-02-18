
import {
	StateStorage,
	ImageItem,
	Credentials,
	EditImage,
	AddMediaItemPayload, MediaItem
} from '@/store/module-storage/module-storage'

export const HYDRATE = (state: StateStorage, payload: StateStorage): void => {
	Object.assign(state, payload)
}

export const ADD_MEDIA_ITEM = (state: StateStorage, payload: MediaItem): void => {
	if (payload.type === 'image') {
		// @ts-ignore
		state.images[payload.id] = payload
		state.imageId++
	} else if (payload.type === 'video') {
		state.videos[payload.id] = payload
		state.videoId++
	}
}

export const ADD_IMAGE = (state: StateStorage, payload: ImageItem): void => {
	state.images[payload.id] = payload
	state.imageId++
}

export const EDIT_IMAGE_DESCRIPTION = (state: StateStorage, payload: EditImage): void => {
	if (payload.id in state.images) {
		state.images[payload.id].description = payload.description
	}
}

export const REMOVE_IMAGE = (state: StateStorage, id: number): void => {
	if (id in state.images) {
		delete state.images[id]
	}
}

export const REMOVE_MEDIA_ITEM = (state: StateStorage, payload: MediaItem): void => {
	if (payload.type === 'image') {
		if (payload.id in state.images) {
			delete state.images[payload.id]
		}
	} else if (payload.type === 'video') {
		if (payload.id in state.videos) {
			delete state.videos[payload.id]
		}
	}
}

export const SAVE_CREDENTIALS = (state: StateStorage, payload: Credentials): void => {
	state.credentials = payload
}
