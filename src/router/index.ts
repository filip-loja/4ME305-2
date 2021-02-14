import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import MemoriesView from '@/views/MemoriesView.vue'
import { useStore } from '@/store'

const store = useStore()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/memories',
    name: 'root'
  },
  {
    path: '/memories',
    component: MemoriesView,
		name: 'memories'
  },
  {
    path: '/memories/add',
    component: () => import('@/views/MemoryForm.vue'),
    name: 'addMemory'
  },
  {
    path: '/memories/:id',
    component: () => import('@/views/MemoryDetail.vue'),
    name: 'memoryDetail'
  },
	{
		path: '/geolocation',
		component: () => import('@/views/GeolocationView.vue'),
		name: 'pageGeolocation'
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
