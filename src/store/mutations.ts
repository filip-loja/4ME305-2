
import { StateRoot } from '@/store/store'
import { Geo } from '@/store/store'

export const SET_GEOLOCATION = (state: StateRoot, payload: Geo): void => {
	state.geolocation = payload
}
