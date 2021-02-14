<template>
	<layout-main title="Manage credentials">
		<div class="ion-padding">
			<ion-list>

				<ion-item>
					<ion-label position="floating">Google API Key</ion-label>
					<ion-input type="text" required v-model="form.googleApiKey" />
				</ion-item>

				<ion-item>
					<ion-label position="floating">Facebook Token</ion-label>
					<ion-input type="text" required v-model="form.facebookToken" />
				</ion-item>

				<ion-item>
					<ion-label position="floating">Facebook Page ID</ion-label>
					<ion-input type="text" required v-model="form.facebookPage" />
				</ion-item>

				<br /><br />
				<ion-button class="taller-btn" expand="block" @click="saveChanges">Save</ion-button>

			</ion-list>
		</div>
	</layout-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue'
import { Credentials } from '@/store/module-storage/module-storage'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ViewCredentialForm',
	components: { IonList, IonItem, IonLabel, IonInput, IonButton },
	setup () {
		const store = useStore()
		const router = useRouter()

		const form = ref<Credentials>({
			googleApiKey: store.state.storage.credentials.googleApiKey,
			facebookToken: store.state.storage.credentials.facebookToken,
			facebookPage: store.state.storage.credentials.facebookPage
		})

		const saveChanges = () => {
			store.commit('storage/SAVE_CREDENTIALS', form.value)
			router.back()
		}

		return {
			form,
			saveChanges
		}
	}
})
</script>

<style scoped>

</style>
