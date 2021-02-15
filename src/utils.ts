import { alertController } from '@ionic/vue'

export const confirmDeletion = async (cb: () => void ) => {
	const alert = await alertController
		.create({
			header: 'Please confirm!',
			message: 'Are you sure that you want to permanently delete this image?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					cssClass: 'warning'
				},
				{
					text: 'Yes',
					handler: () => cb(),
				},
			],
		});
	return alert.present()
}
