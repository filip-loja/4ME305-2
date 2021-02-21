import {MediaItem, MediaType, StateStorage} from '@/store/module-storage/module-storage'

export interface StateRoot {
	geolocation?: Geo;
	mapTitle: string;
	imageUpload: ImageUpload;
	timeoutRef: number;
	loadedMedia: LoadedMedia;
}

export interface Geo {
	lat: number;
	lon: number;
}

export interface ModulesRef {
	storage?: StateStorage
}

export interface LoadedMedia {
	id: number;
	type: MediaType;
	data: string;
}

export interface ImageUpload extends MediaItem {
	data: string;
}

export type StoreDef = StateRoot & ModulesRef
