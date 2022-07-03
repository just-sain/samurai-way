import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': '70c4f585-2d60-4789-a00c-d5cfeaa5d461' }
})

export type TDefaultType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}
