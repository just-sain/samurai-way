import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': '70c4f585-2d60-4789-a00c-d5cfeaa5d461' },
});

export const authAPI = {
	getAuthMe: async () => {
		const response = await instance.get(`auth/me`);
		return response.data;
	},
	login: async (email, password, rememberMe) => {
		const response = await instance.post(`auth/login`, { email, password, rememberMe });
		return response.data;
	},
	logout: async () => {
		const response = await instance.delete(`auth/login`);
		return response.data;
	},
};

export const profileAPI = {
	getProfile: async userID => {
		const response = await instance.get(`profile/${userID}`);
		return response.data;
	},
	getStatus: async userID => {
		const response = await instance.get(`profile/status/${userID}`);
		return response.data;
	},
	updateStatus: async status => {
		const response = await instance.put(`profile/status`, { status });
		return response.data;
	},
	updatePhoto: async photo => {
		const formData = new FormData();
		formData.append('image', photo);
		const response = await instance.put(`profile/photo`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	},
};

export const usersAPI = {
	getUsers: async (currentPage = 1, pageSize = 10) => {
		const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
		return response.data;
	},
	followUser: async userID => {
		const response = await instance.post(`follow/${userID}`);
		return response.data;
	},
	unfollowUser: async userID => {
		const response = await instance.delete(`follow/${userID}`);
		return response.data;
	},
	getProfile: async userID => {
		// example for obsolete method
		console.warn('Obsolete method. Please use method in profileAPI object.');
		return profileAPI.getProfile(userID); // using delegation
	},
};
