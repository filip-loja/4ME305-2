
import { StateStorage, ImageItem, MediaItem } from '@/store/module-storage/module-storage'

export const imageList = (state: StateStorage): ImageItem[] => {
	return Object.values(state.images).reverse()
}

export const videoList = (state: StateStorage): MediaItem[] => {
	return Object.values(state.videos).reverse()
}

