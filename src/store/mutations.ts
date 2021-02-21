
import {ImageUpload, LoadedMedia, StateRoot} from '@/store/store'
import { Geo } from '@/store/store'

export const SET_GEOLOCATION = (state: StateRoot, payload: Geo): void => {
	state.geolocation = payload
}

export const SET_MAP_TITLE = (state: StateRoot, payload: string): void => {
	state.mapTitle = payload
}

export const SET_IMAGE_UPLOAD = (state: StateRoot, payload: ImageUpload): void => {
	state.imageUpload = { ...payload }
}

export const LOAD_MEDIA = (state: StateRoot, payload: LoadedMedia): void => {
	state.loadedMedia = payload
}

export const SET_TIMEOUT_REF = (state: StateRoot, payload: number): void => {
	state.timeoutRef = payload
}
