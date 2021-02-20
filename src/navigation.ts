import { camera, card, film, helpCircle, home, image, map, videocam } from 'ionicons/icons'
import { menuController } from '@ionic/vue'
import { Router } from 'vue-router'
import { Store } from 'vuex'
import { StoreDef } from '@/store/store'

export default (router: Router, store: Store<StoreDef>) => [
	{
		label: 'Home',
		icon: home,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewHome' }).catch(() => null)
		}
	},
	{
		label: 'Image Gallery',
		icon: image,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewImageList' }).catch(() => null)
		}
	},
	{
		label: 'Video Gallery',
		icon: film,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewVideoList' }).catch(() => null)
		}
	},
	{
		label: 'Take Picture',
		icon: camera,
		handler: async () => {
			await menuController.close()
			store.dispatch('storage/takePicture').then(id => router.push({ name: 'viewImageDetail', params: { id } }))
		}
	},
	{
		label: 'Record Video',
		icon: videocam,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewVideoRecorder' }).catch(() => null)
		}
	},
	{
		label: 'Find me',
		icon: map,
		handler: async () => {
			await menuController.close()
			await store.dispatch('runGeolocation')
			store.commit('SET_MAP_TITLE', '[ME]')
			router.push({ name: 'viewMap' }).catch(() => null)
		}
	},
	{
		label: 'Credentials',
		icon: card,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewCredentials' }).catch(() => null)
		}
	},
	{
		label: 'About',
		icon: helpCircle,
		handler: async () => {
			await menuController.close()
			router.push({ name: 'viewAbout' }).catch(() => null)
		}
	}
]
