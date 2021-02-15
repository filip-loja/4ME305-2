import { ActionContext } from 'vuex'
import { Geo, StateRoot } from '@/store/store'
import { GeolocationPosition } from '@capacitor/core'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

type A = ActionContext<StateRoot, StateRoot>

export const runGeolocation = async (context: A): Promise<boolean> => {
	const result: Geo = {} as Geo
	context.commit('SET_GEOLOCATION', null)
	try {
		const location: GeolocationPosition = await Geolocation.getCurrentPosition()
		result.lat = location.coords.latitude
		result.lon = location.coords.longitude
		context.commit('SET_GEOLOCATION', result)
		return Promise.resolve(true)
	} catch (e) {
		return Promise.resolve(false)
	}
}
