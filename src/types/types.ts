export type photosType = {
	small: null | string
	large: null | string
}

export type contactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export type profileType = {
	userId: number
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: string
	contacts: contactsType
	photos: photosType
}

export type userType = {
	id: number
	name: string
	photos: photosType
	status: null
	followed: boolean
}

export type dataType = {
	id: null | number
	login: null | string
	email: null | string
}
