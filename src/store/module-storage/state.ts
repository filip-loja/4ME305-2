
import { StateStorage } from '@/store/module-storage/module-storage'

export const stateStorage: StateStorage = {
	images: {},
	videos: {},
	imageId: 1,
	videoId: 1,
	credentials: {
		facebookPage: null,
		facebookToken: null,
		googleApiKey: null
	}
}
