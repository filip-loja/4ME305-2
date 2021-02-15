import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import MemoriesView from '@/views/MemoriesView.vue'

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
	},
	{
		path: '/credentials',
		component: () => import('@/views/ViewCredentialForm.vue'),
		name: 'viewCredentials'
	},
	{
		path: '/about',
		component: () => import('@/views/ViewAbout.vue'),
		name: 'viewAbout'
	},
	{
		path: '/images/:id',
		component: () => import('@/views/ViewImageDetail.vue'),
		name: 'viewImageDetail'
	},
	{
		path: '/images',
		component: () => import('@/views/ViewImageList.vue'),
		name: 'viewImageList'
	},
	{
		path: '/map',
		component: () => import('@/views/ViewMap.vue'),
		name: 'viewMap'
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
