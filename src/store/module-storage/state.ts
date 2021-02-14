
import { StateStorage } from '@/store/module-storage/module-storage'

export const stateStorage: StateStorage = {
	images: {},
	credentials: {
		facebookPage: null,
		facebookToken: null,
		googleApiKey: null
	}
}
