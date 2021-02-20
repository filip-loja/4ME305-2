
import { Geo } from '@/store/store'

export type MediaType = 'image' | 'video'

export interface MediaItem {
	id?: number;
	description?: string;
	name?: string;
	path: string;
	date: string;
	geolocation?: Geo;
	type: MediaType;
	size?: number;
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
	images: MediaMap;
	videos: MediaMap;
	imageId: number;
	videoId: number;
	credentials: Credentials;
}

export interface MediaItemUpdate {
	id?: number;
	description?: string;
	name?: string;
	type: MediaType;
}

