<template>
	<div class="map-header">
		<div>
			<div><pre>Lat: {{ $filters.pipeGeo(lat) }}</pre></div>
			<div><pre>Lon: {{ $filters.pipeGeo(lon) }}</pre></div>
		</div>
		<div>
			<ion-button @click="emitClick" class="taller-btn">
				<ion-icon slot="icon-only" :icon="icon" />
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton, IonIcon } from '@ionic/vue'
export default defineComponent({
	name: 'GoogleMapHeader',
	components: { IonButton, IonIcon },
	emits: ['click'],
	props: {
		lat: { type: Number, default: 0 },
		lon: { type: Number, default: 0 },
		icon: { type: String, required: true }
	},
	setup (props, { emit }) {
		const emitClick = () => {
			emit('click')
		}
		return {
			emitClick
		}
	}
})
</script>

<style scoped>
	.map-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
	}

	.map-header pre {
		margin: 0;
	}
</style>
