import { instance, TDefaultType } from './api'
import profileAPI from './profile-api'
import { TUser } from '../types/types'

type TGetUsers = {
	items: Array<TUser>
	totalCount: number
	error: null | string
}

const usersAPI = {
	getUsers: async (currentPage: number = 1, pageSize: number = 10, term: string, friend: null | boolean) => {
		const response = await instance.get<TGetUsers>(
			`users?page=${currentPage}&count=${pageSize}&term=${term}${friend !== null ? `&friend=${friend}` : ``}`
		)
		return response.data
	},
	followUser: async (userID: number) => {
		const response = await instance.post<TDefaultType>(`follow/${userID}`)
		return response.data
	},
	unfollowUser: async (userID: number) => {
		const response = await instance.delete<TDefaultType>(`follow/${userID}`)
		return response.data
	},
	getProfile: async (userID: number) => {
		// example for obsolete method
		console.warn('Obsolete method. Please use method in profileAPI object.')
		return profileAPI.getProfile(userID) // using delegation
	}
}

export default usersAPI
