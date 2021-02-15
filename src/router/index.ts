import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('@/views/ViewImageList.vue'),
		name: 'viewImageList'
	},
	{
		path: '/images/:id',
		component: () => import('@/views/ViewImageDetail.vue'),
		name: 'viewImageDetail'
	},
	{
		path: '/map',
		component: () => import('@/views/ViewMap.vue'),
		name: 'viewMap'
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
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
