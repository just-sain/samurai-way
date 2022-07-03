import { TDefaultType, instance } from './api'

type TAuthMe = {
	id: number
	email: string
	login: string
}
type TLogin = { userId: number }

const authAPI = {
	getAuthMe: async () => {
		const response = await instance.get<TDefaultType<TAuthMe>>(`auth/me`)
		return response.data
	},
	login: async (email: string, password: string, rememberMe: boolean, captcha: null | string) => {
		const response = await instance.post<TDefaultType<TLogin>>(`auth/login`, { email, password, rememberMe, captcha })
		return response.data
	},
	logout: async () => {
		const response = await instance.delete<TDefaultType>(`auth/login`)
		return response.data
	}
}

export default authAPI
