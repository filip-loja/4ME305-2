import { ActionContext } from 'vuex'
import { Geo, StateRoot } from '@/store/store'
import { GeolocationPosition } from '@capacitor/core'
import { withTimeout } from '@/utils'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

type A = ActionContext<StateRoot, StateRoot>

export const runGeolocation = async (context: A): Promise<boolean> => {
	const request = Geolocation.getCurrentPosition().then((location: GeolocationPosition) => {
		const result: Geo = {
			lat: location.coords.latitude,
			lon: location.coords.longitude
		}
		context.commit('SET_GEOLOCATION', result)
		return true
	})
	return withTimeout(10000, request)
		.catch(() => context.commit('SET_GEOLOCATION', null))
}
