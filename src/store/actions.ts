import { ActionContext } from 'vuex'
import { Geo, GeoResult, StateRoot } from '@/store/store'
import { GeolocationPosition } from '@capacitor/core'
import { Plugins } from '@capacitor/core'
import { menuController } from '@ionic/vue'
const { Geolocation } = Plugins

type A = ActionContext<StateRoot, StateRoot>

export const runGeolocation = async (context: A): Promise<GeoResult> => {
	const result: Geo = {} as Geo
	try {
		const location: GeolocationPosition = await Geolocation.getCurrentPosition()
		result.lat = location.coords.latitude
		result.lon = location.coords.longitude
		context.commit('SET_GEOLOCATION', result)
		return Promise.resolve({ success: true, data: result })
	} catch (e) {
		context.commit('SET_GEOLOCATION', null)
		return Promise.resolve({ success: false, data: null })
	}
}
