<template>
	<div style="display: block; width: 100%; height: 50px;"></div>
	<ion-footer class="footer">
		<div class="footer-inner">
			<ion-button class="taller-btn" expand="full" fill="outline" @click="emit('click-facebook')">
				<ion-icon :icon="logoFacebook" />
			</ion-button>
			<ion-button class="taller-btn" expand="full" fill="outline" @click="emit('click-edit')">
				<ion-icon :icon="pencil" color="dark" />
			</ion-button>
			<ion-button class="taller-btn" expand="full" fill="outline" @click="emit('click-delete')">
				<ion-icon :icon="trash" color="danger" />
			</ion-button>
		</div>
	</ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonFooter, IonButton, IonIcon } from '@ionic/vue'
import { logoFacebook, trash, pencil } from 'ionicons/icons'

export default defineComponent({
	name: 'ImageDetailTabs',
	emits: ['click-facebook', 'click-edit', 'click-delete'],
	components: { IonFooter, IonButton, IonIcon },
	setup (props, { emit }) {
		return {
			logoFacebook,
			trash,
			pencil,
			emit
		}
	}
})
</script>

<style scoped>

	.footer {
		position: fixed;
		bottom: 0;
	}

	.footer-inner {
		display: flex;
		width: 100%;
		background-color: white;
	}

	.footer-inner .taller-btn {
		margin: 0;
		flex: 1;
	}

</style>
