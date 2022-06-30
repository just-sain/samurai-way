import axios from 'axios'
// types
import { profileType } from '../types/types'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': '70c4f585-2d60-4789-a00c-d5cfeaa5d461' }
})

export const authAPI = {
	getAuthMe: async () => {
		const response = await instance.get(`auth/me`)
		return response.data
	},
	login: async (email: string, password: string, rememberMe: boolean, captcha: null | string) => {
		const response = await instance.post(`auth/login`, { email, password, rememberMe, captcha })
		return response.data
	},
	logout: async () => {
		const response = await instance.delete(`auth/login`)
		return response.data
	}
}

export const profileAPI = {
	getProfile: async (userID: number) => {
		const response = await instance.get(`profile/${userID}`)
		return response.data
	},
	updateProfile: async (profileData: profileType) => {
		const response = await instance.put('profile', profileData)
		return response.data
	},
	getStatus: async (userID: number) => {
		const response = await instance.get(`profile/status/${userID}`)
		return response.data
	},
	updateStatus: async (status: string) => {
		const response = await instance.put(`profile/status`, { status })
		return response.data
	},
	updatePhoto: async (photo: any) => {
		const formData = new FormData()
		formData.append('image', photo)
		const response = await instance.put(`profile/photo`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response.data
	}
}

export const usersAPI = {
	getUsers: async (currentPage: number = 1, pageSize: number = 10) => {
		const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
		return response.data
	},
	followUser: async (userID: number) => {
		const response = await instance.post(`follow/${userID}`)
		return response.data
	},
	unfollowUser: async (userID: number) => {
		const response = await instance.delete(`follow/${userID}`)
		return response.data
	},
	getProfile: async (userID: number) => {
		// example for obsolete method
		console.warn('Obsolete method. Please use method in profileAPI object.')
		return profileAPI.getProfile(userID) // using delegation
	}
}

export const security = {
	getCaptcha: async () => {
		const response = await instance.get(`security/get-captcha-url`)
		return response.data
	}
}
