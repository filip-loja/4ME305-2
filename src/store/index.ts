
import {Plugins, FilesystemDirectory, FilesystemEncoding} from '@capacitor/core';
const {Filesystem} = Plugins;

const STATE_NAME = 'vuex.json'

const saveState = (state: any) => {
	Filesystem.writeFile({
		path: STATE_NAME,
		data: JSON.stringify(state),
		directory: FilesystemDirectory.Data,
		encoding: FilesystemEncoding.UTF8
	}).then(() => console.log('STORE SAVED'))
}

export const loadState = async () => {
	let vuexContent = null
	let success
	try {
		vuexContent = await Filesystem.readFile({
			path: STATE_NAME,
			directory: FilesystemDirectory.Data,
			encoding: FilesystemEncoding.UTF8
		})
		success = true
		vuexContent = JSON.parse(vuexContent.data)
	} catch (e) {
		vuexContent = e
		success = false
	}

	return Promise.resolve({
		vuexContent,
		success
	})
}

const persistent = (store: any) => {
	store.subscribe((mutation: any, state: any) => {
		if (mutation.type !== 'HYDRATE') {
			saveState(state)
		}
	})
}

import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, ModuleTree } from 'vuex'
import moduleStorage from '@/store/module-storage'
import { ModulesRef } from '@/store/store'
import { StateRoot } from '@/store/store'
import * as actions from '@/store/actions'
import * as mutations from '@/store/mutations'


export const key: InjectionKey<Store<StateRoot & ModulesRef>> = Symbol()

export function useStore () {
	return baseUseStore(key)
}

const store = createStore<StateRoot>({

	modules: {
		storage: moduleStorage
	},

	// plugins: [
	// 	persistent
	// ],
  state: {
		geolocation: null,
		items: [
			{
				id: 'i1',
				title: 'Trip into the mountain',
				description: 'Lorem ipsum 1',
				image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
			},
			{
				id: 'i2',
				title: 'See trip in Skid row',
				description: 'Lorem ipsum 2',
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOZrs4wCcYsz0b4C13YYACUSE2f-77DMIbpQ&usqp=CAU'
			},
			{
				id: 'i3',
				title: 'American Horror story',
				description: 'Lorem ipsum 3',
				image: 'https://deadline.com/wp-content/uploads/2019/04/american-horror-story-1.jpg'
			}
		]
  },
	mutations,
	actions,
  // mutations: {
  //   ADD_MEMORY(state: any, payload) {
  //     const newMemory = {
  //       id: (new Date()).toISOString(),
  //       ...payload
  //     }
  //     state.items.unshift(newMemory);
  //   },
	// 	HYDRATE(state: any, payload) {
	// 		Object.assign(state, payload)
	// 		console.log('STORE HYDRATED')
	// 	}
  // },
  // actions: {
  //   addMemory(context, payload) {
  //     context.commit('ADD_MEMORY', payload)
  //   }
  // },
  getters: {
    memories(state: any) {
      return state.items
    }
  }
})

export default store
