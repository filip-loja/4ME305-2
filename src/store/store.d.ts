import {ImageItem, StateStorage} from '@/store/module-storage/module-storage'

export interface StateRoot {
	items: Record<string, string>[];
	geolocation?: Geo;
	mapTitle: string;
	imageUpload: ImageUpload;
}

export interface Geo {
	lat: number;
	lon: number;
}

export interface ModulesRef {
	storage: StateStorage
}

export interface ImageUpload extends ImageItem {
	data: string;
}
