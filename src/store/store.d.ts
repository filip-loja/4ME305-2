import { ImageItem, StateStorage } from '@/store/module-storage/module-storage'

export interface StateRoot {
	geolocation?: Geo;
	mapTitle: string;
	imageUpload: ImageUpload;
	timeoutRef: number;
}

export interface Geo {
	lat: number;
	lon: number;
}

export interface ModulesRef {
	storage?: StateStorage
}

export interface ImageUpload extends ImageItem {
	data: string;
}

export type StoreDef = StateRoot & ModulesRef
