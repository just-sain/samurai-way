import { instance, TDefaultType } from './api'
import { TProfile, TPhotos, TUpdateProfile } from '../types/types'

const profileAPI = {
	getProfile: async (userID: number) => {
		const response = await instance.get<TProfile>(`profile/${userID}`)
		return response.data
	},
	updateProfile: async (profileData: TUpdateProfile) => {
		const response = await instance.put<TDefaultType>('profile', profileData)
		return response.data
	},
	getStatus: async (userID: number) => {
		const response = await instance.get<string>(`profile/status/${userID}`)
		return response.data
	},
	updateStatus: async (status: string) => {
		const response = await instance.put<TDefaultType>(`profile/status`, { status })
		return response.data
	},
	updatePhoto: async (photo: File) => {
		const formData = new FormData()
		formData.append('image', photo)
		const response = await instance.put<TDefaultType<{ photos: TPhotos }>>(`profile/photo`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response.data
	}
}

export default profileAPI
