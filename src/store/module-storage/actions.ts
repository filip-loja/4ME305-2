import { ActionContext } from 'vuex';
import { StateRoot } from '@/store/store'
import { StateStorage, ImageItem } from '@/store/module-storage/module-storage'

type A = ActionContext<StateStorage, StateRoot>

export const addImage = (context: A, payload: ImageItem) => {
	payload.id = Date.now()
	context.commit('ADD_IMAGE', payload)
}

export const removeImage = (context: A, id: number): Promise<boolean> => {
	if (id in context.state.images) {
		context.commit('REMOVE_IMAGE', id)
		return Promise.resolve(true)
	} else {
		return Promise.resolve(false)
	}
}

