
import { Module } from 'vuex/types'
import { StateStorage } from '@/store/module-storage/module-storage'
import { StateRoot } from '@/store/store'
import { stateStorage } from '@/store/module-storage/state'
import * as actions from '@/store/module-storage/actions'
import * as mutations from '@/store/module-storage/mutations'
import * as getters from '@/store/module-storage/getters'

const moduleStorage: Module<StateStorage, StateRoot> = {
	namespaced: true,
	state: stateStorage,
	actions,
	mutations,
	getters
}

export default moduleStorage
