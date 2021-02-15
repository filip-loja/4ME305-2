import { StateStorage } from '@/store/module-storage/module-storage'

export interface StateRoot {
	items: Record<string, string>[];
	geolocation?: Geo;
	mapTitle: string;
}

export interface Geo {
	lat: number;
	lon: number;
}

export interface ModulesRef {
	storage: StateStorage
}
