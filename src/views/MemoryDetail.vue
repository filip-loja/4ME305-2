<template>
	<layout-main title="Detail">
		<memory-overview :model="model" v-if="model" />
	</layout-main>
</template>

<script lang="ts">
import MemoryOverview from '@/components/MemoryOverview.vue'
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MemoryDetail',
	components: {
    MemoryOverview
	},
	data () {
		return {
			id: null
		}
	},
	watch: {
		'$route.params.id': {
			handler(newId): any {
				if (newId) {
					this.id = newId
				} else {
					setTimeout(() => this.id = null, 300)
				}
			},
			immediate: true
		}
	},
	computed: {
		model (): any {
			// @ts-ignore
			return this.$store.getters.memories.find(item => item.id === this.id)
		}
	}
})
</script>

<style scoped>

</style>
