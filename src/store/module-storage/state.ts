
import { StateStorage } from '@/store/module-storage/module-storage'

export const stateStorage: StateStorage = {
	images: {},
	imageId: 1,
	credentials: {
		facebookPage: null,
		facebookToken: null,
		googleApiKey: null
	}
}
