
import {StateStorage, ImageItem, Credentials} from '@/store/module-storage/module-storage'

export const HYDRATE = (state: StateStorage, payload: StateStorage): void => {
	Object.assign(state, payload)
	console.log('HYDRATED')
}

export const ADD_IMAGE = (state: StateStorage, payload: ImageItem): void => {
	state.images[payload.id] = payload
	state.imageId++
}

export const REMOVE_IMAGE = (state: StateStorage, id: number): void => {
	if (id in state.images) {
		delete state.images[id]
	}
}

export const SAVE_CREDENTIALS = (state: StateStorage, payload: Credentials): void => {
	state.credentials = payload
}
