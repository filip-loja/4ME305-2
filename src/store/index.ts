import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
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
    }
  },
  mutations: {
    ADD_MEMORY(state: any, payload) {
      const newMemory = {
        id: (new Date()).toISOString(),
        ...payload
      }
      state.items.unshift(newMemory);
    }
  },
  actions: {
    addMemory(context, payload) {
      context.commit('ADD_MEMORY', payload)
    }
  },
  getters: {
    memories(state: any) {
      return state.items
    }
  }
})

export default store
