<template>
	<layout-main :title="title">
		<template v-slot:actions-end>
			<ion-button :router-link="{name: 'addMemory'}">
				<ion-icon slot="icon-only" :icon="icons.add" />
			</ion-button>
		</template>

		<ion-button expand="block" :router-link="{name: 'pageGeolocation'}">Geolocation</ion-button>
		<ion-button expand="block" :router-link="{name: 'pageCredentials'}">Credentials</ion-button>
		<memory-list />
	</layout-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue'
import { add } from 'ionicons/icons'
import MemoryList from '@/components/MemoryList.vue'
export default defineComponent({
	name: 'MemoriesView',
  components: {
    MemoryList,
    IonButton,
    IonIcon
  },
	data () {
		return {
			title: 'All memories',
			icons: {
				add
			}
		}
	},
	computed: {
		memories () {
			return this.$store.getters.memories
		}
	}
})
</script>

<style scoped>

</style>
