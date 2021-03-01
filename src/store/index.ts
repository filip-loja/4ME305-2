import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import moduleStorage from '@/store/module-storage'
import { StoreDef } from '@/store/store'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import { persistent } from '@/store/persistent'

export const key: InjectionKey<Store<StoreDef>> = Symbol()
export function useStore () {
	return baseUseStore(key)
}

const store = createStore<StoreDef>({

	modules: { storage: moduleStorage },
	plugins: [ persistent ],

  state: {
		geolocation: null,
		mapTitle: null,
		timeoutRef: null,
		loadedMedia: null,
	},
	mutations,
	actions
})

export default store
