<template>
	<iframe frameborder="0" style="border:0" :src="src"></iframe>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
	name: 'GoogleMap',
	props: {
		lat: { type: Number, default: 0 },
		lon: { type: Number, default: 0 }
	},
	setup (props) {
		const store = useStore()
		const src = computed<string>(() => {
			return `https://www.google.com/maps/embed/v1/place?q=${props.lat},${props.lon}&key=${store.state.storage.credentials.googleApiKey}`
		})

		return {
			src
		}
	}
})
</script>

<style scoped>

</style>
