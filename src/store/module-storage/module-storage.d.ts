
import { Geo } from '@/store/store'

export type MediaType = 'image' | 'video'

export interface MediaItem {
	id?: number;
	description?: string;
	path: string;
	date: string;
	geolocation?: Geo;
	type: MediaType;
}

export interface ImageItem {
	id?: number;
	description?: string;
	directory: string;
	path: string;
	date: string;
	geolocation?: Geo
}

export interface ImageMap {
	[key: number]: ImageItem
}

export interface MediaMap {
	[key: number]: MediaItem;
}

export interface Credentials {
	facebookToken: string;
	facebookPage: string;
	googleApiKey: string;
}

export interface StateStorage {
	images: ImageMap;
	videos: MediaMap;
	imageId: number;
	videoId: number;
	credentials: Credentials;
}

export interface EditImage {
	id: number;
	description: string;
}

export interface AddMediaItemPayload {
	type: MediaType;
	value: MediaItem;
}

