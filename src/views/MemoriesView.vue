<template>
	<layout-main title="All memories">
		<template v-slot:actions-end>
			<ion-button :router-link="{name: 'addMemory'}">
				<ion-icon slot="icon-only" :icon="add" />
			</ion-button>
		</template>

		<ion-button expand="block" :router-link="{name: 'pageGeolocation'}">Geolocation</ion-button>
		<ion-button expand="block" :router-link="{name: 'pageCredentials'}">Credentials</ion-button>
		<ion-button expand="block" @click="takePicture">Take a Picture</ion-button>
		<memory-list />
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue'
import { add } from 'ionicons/icons'
import MemoryList from '@/components/MemoryList.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'MemoriesView',
  components: {
    MemoryList,
    IonButton,
    IonIcon
  },
	setup () {
		const store = useStore()
		const router = useRouter()
		const memories = computed(() => store.getters.memories)

		const takePicture = () => {
			store.dispatch('storage/takePicture').then(id => router.push({ name: 'viewImageDetail', params: { id } }))
		}

		return {
			memories,
			takePicture,
			add
		}
	}
})
</script>

<style scoped>

</style>
