import { Store } from 'vuex'
import { StoreDef } from '@/store/store'
import { convertToBlob, withTimeout } from '@/utils/utils'

// https://developers.facebook.com/docs/video-api/getting-started

export interface FacebookVideoConfig {
	url: string;
	token: string;
}

export interface FacebookPost {
	data: string;
	message: string;
}

export async function initVideoUpload (config: FacebookVideoConfig, fileSize: number) {
	console.log('FB:video ... initiating upload')
	const form = new FormData()
	form.append('file_size', String(fileSize))
	form.append('upload_phase', 'start')
	form.append('access_token', config.token)

	return fetch(config.url, { body: form, method: 'post' })
		.then(response => response.json())
}

export async function uploadVideoChunks (config: FacebookVideoConfig, file: File, resp: any) {
	if (resp.start_offset === resp.end_offset) {
		console.log('FB:video ... chunks uploaded')
		return
	}

	console.log('FB:video ... uploading chunk: ', resp.start_offset, '-', resp.end_offset)
	const form = new FormData()
	form.append('upload_phase', 'transfer')
	form.append('start_offset', resp.start_offset)
	form.append('upload_session_id', resp.upload_session_id)
	form.append('access_token', config.token)
	form.append('video_file_chunk', file.slice(resp.start_offset, resp.end_offset))

	const newResp = await fetch(config.url, { body: form, method: 'post' }).then(response => response.json())
	newResp['upload_session_id'] = resp.upload_session_id
	await uploadVideoChunks(config, file, newResp)
}

export async function finishVideoUpload (config: FacebookVideoConfig, sessionId: string, description: string) {
	console.log('FB:video ... finishing upload')
	const form = new FormData()
	form.append('upload_phase', 'finish')
	form.append('upload_session_id', sessionId)
	form.append('access_token', config.token)
	form.append('description', description)
	return fetch(config.url, { body: form, method: 'post' })
		.then(response => response.json())
}

export async function postVideoToFacebook (store: Store<StoreDef>, payload: FacebookPost): Promise<any> {
	const config: FacebookVideoConfig = {
		url: `https://graph-video.facebook.com/${store.state.storage.credentials.facebookPage}/videos`,
		token: store.state.storage.credentials.facebookToken
	}
	const blob = await convertToBlob(payload.data)
	const file = new File([blob], 'FILENAME', { type: "video/mp4", lastModified: Date.now() })

	const resp = await initVideoUpload(config, file.size)
	await uploadVideoChunks(config, file, resp)
	return finishVideoUpload(config, resp.upload_session_id, payload.message).then(() => null)
}

export async function postImageToFacebook (store: Store<StoreDef>, payload: FacebookPost) {

	const blob = await convertToBlob(payload.data)
	const formData = new FormData()
	formData.append('access_token', store.state.storage.credentials.facebookToken)
	formData.append('message', payload.message)
	formData.append('source', blob)
	const url = `https://graph.facebook.com/${store.state.storage.credentials.facebookPage}/photos`

	const request = fetch(url, { body: formData, method: 'post' })
		.then(response => response.json())
		.then(data => {
			if (data.id) {
				return null
			} else {
				return data.error.message
			}
		})

	return withTimeout(15000, request).catch(e => e)
}
