
import { Geo } from '@/store/store'

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

export interface Credentials {
	facebookToken: string;
	facebookPage: string;
	googleApiKey: string;
}

export interface StateStorage {
	images: ImageMap;
	imageId: number;
	credentials: Credentials;
}


