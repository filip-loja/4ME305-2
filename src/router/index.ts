import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { loadImage } from '@/utils'
import {ImageUpload} from '@/store/store'
import { errorAlert } from '@/utils'
import { imageUploadGuard } from '@/router/router-guards'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('@/views/ViewImageList.vue'),
		name: 'viewImageList'
	},
	{
		path: '/images/:id/edit',
		component: () => import('@/views/ViewImageEdit.vue'),
		name: 'viewImageEdit'
	},
	{
		path: '/images/:id/post',
		component: () => import('@/views/ViewImageUpload.vue'),
		name: 'viewImageUpload'
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
	},
	{
		path: '/video/list',
		component: () => import('@/views/ViewVideoList.vue'),
		name: 'viewVideoList'
	},
	{
		path: '/video/record',
		component: () => import('@/views/ViewVideoRecorder.vue'),
		name: 'viewVideoRecorder'
	},
	{
		path: '/video/:id',
		component: () => import('@/views/ViewVideoDetail.vue'),
		name: 'viewVideoDetail'
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	if (to.name === 'viewImageUpload') {
		imageUploadGuard(to).then(() => next())
			.catch(e => errorAlert(e).then(() => next(false)))
	} else {
		next()
	}
})

export default router
