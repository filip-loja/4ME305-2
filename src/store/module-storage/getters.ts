
import {StateStorage, ImageItem} from '@/store/module-storage/module-storage'

export const imageList = (state: StateStorage): ImageItem[] => {
	return Object.values(state.images)
}

