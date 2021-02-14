
import { StateStorage, ImageItem } from '@/store/module-storage/module-storage'

export const HYDRATE = (state: StateStorage, payload: StateStorage): void => {
	Object.assign(state, payload)
}

export const ADD_IMAGE = (state: StateStorage, payload: ImageItem): void => {
	state.images[payload.id] = payload
}

export const REMOVE_IMAGE = (state: StateStorage, id: number): void => {
	delete state.images[id]
}
