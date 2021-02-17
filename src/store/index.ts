import { createStore, Store, useStore as baseUseStore, ModuleTree } from 'vuex'
import { InjectionKey } from 'vue'
import moduleStorage from '@/store/module-storage'
import { ModulesRef } from '@/store/store'
import { StateRoot } from '@/store/store'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'
import { persistent } from '@/store/persistent'

export const key: InjectionKey<Store<StateRoot & ModulesRef>> = Symbol()
export function useStore () {
	return baseUseStore(key)
}

const store = createStore<StateRoot>({

	modules: { storage: moduleStorage },
	plugins: [ persistent ],

  state: {
		geolocation: null,
		mapTitle: null,
		imageUpload: null,
	},
	mutations,
	actions
})

export default store
