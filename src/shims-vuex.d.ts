// https://stackoverflow.com/questions/64412243/vue-js-3-and-typescript-property-store-does-not-exist-on-type-componentpub
import { Store } from 'vuex'
declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store;
	}
}
