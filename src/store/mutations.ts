
import { StateRoot } from '@/store/store'
import { Geo } from '@/store/store'

export const SET_GEOLOCATION = (state: StateRoot, payload: Geo): void => {
	state.geolocation = payload
}

export const SET_MAP_TITLE = (state: StateRoot, payload: string): void => {
	state.mapTitle = payload
}
