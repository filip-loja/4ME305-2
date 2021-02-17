import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { loadImage } from '@/utils'
import {ImageUpload} from '@/store/store'
import { errorAlert } from '@/utils'

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
	}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	if (to.name === 'viewImageUpload') {
		const id = Number(to.params.id)
		if (store.state.imageUpload === null || store.state.imageUpload.id !== id) {
			// @ts-ignore
			const tmpModel = store.state.storage.images[id]
			errorAlert(JSON.stringify(tmpModel))
			loadImage(tmpModel).then(data => {
				const imageUpload: ImageUpload = { ...tmpModel, data }
				store.commit('SET_IMAGE_UPLOAD', imageUpload)
				next()
			}).catch((e) => errorAlert(e).then(() => next(false)))
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
