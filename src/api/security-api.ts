import { instance } from './api'

type TGetCaptcha = {
	url: string
}

const securityAPI = {
	getCaptcha: async () => {
		const response = await instance.get<TGetCaptcha>(`security/get-captcha-url`)
		return response.data
	}
}

export default securityAPI
