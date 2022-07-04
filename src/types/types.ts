// profile
export type TPhotos = {
	small: null | string
	large: null | string
}

export type TContacts = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
	[key: string]: string
}

export type TProfile = {
	userId: null | number
	aboutMe: string
	fullName: null | string
	lookingForAJob: null | boolean
	lookingForAJobDescription: null | string
	contacts: TContacts
	photos: TPhotos
}

export type TUpdateProfile = {
	aboutMe: string
	fullName: null | string
	lookingForAJob: null | boolean
	lookingForAJobDescription: null | string
	contacts: TContacts
}

export type TPost = {
	id: number
	text: string
	likes: number
}

// users
export type TUser = {
	id: number
	name: string
	photos: TPhotos
	status: null | string
	followed: boolean
}

export type TData = {
	id: null | number
	login: null | string
	email: null | string
}

// dialogs
export type TDialogs = {
	id: number
	name: string
}
export type TMessages = {
	id: number
	text: string
}
