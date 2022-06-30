import { profileAPI } from '../api/api'
import { photosType, profileType } from '../types/types'
import { setProfileErrors } from './errorsReducer'

const ADD_POST = 'profile/ADD-POST',
	DELETE_POST = 'profile/DELETE_POST',
	SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
	SET_USER_STATUS = 'profile/SET_USER_STATUS',
	SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS',
	RESET_PAGE = 'profile/RESET_PAGE'

type postType = {
	id: number
	text: string
	likes: number
}

const initialState = {
	posts: [
		{ id: 1, text: 'hi i am not a moron', likes: 10 },
		{ id: 2, text: 'hi i am moron', likes: 25 },
		{ id: 3, text: 'mmm yeah...', likes: 0 }
	] as Array<postType>,

	profile: null as null | profileType,
	status: null as null | string
}
export type initialStateType = typeof initialState

const profileReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: state.posts.length + 1,
				text: action.text,
				likes: 0
			}
			return {
				...state,
				posts: [...state.posts, { ...newPost }]
			}
		}
		case DELETE_POST: {
			return {
				...state,
				posts: [...state.posts.filter(post => post.id !== action.postID)]
			}
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		case SET_USER_STATUS: {
			return {
				...state,
				status: action.status
			}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as profileType
			}
		}
		case RESET_PAGE: {
			return {
				...initialState,
				posts: [...state.posts]
			}
		}
		default: {
			return state
		}
	}
}

// thunks
export const getFullProfile = (userID: number) => async (dispatch: any) => {
	await dispatch(getProfile(userID))
	await dispatch(getStatus(userID))
}

export const getProfile = (userID: number) => async (dispatch: any) => {
	const data = await profileAPI.getProfile(userID)
	dispatch(setUserProfile(data))
}

export const saveProfile = (profileData: profileType) => async (dispatch: any, getState: any) => {
	const id = getState().auth.data.id
	const data = await profileAPI.updateProfile(profileData)
	if (data.resultCode === 0) {
		dispatch(getFullProfile(id))
		dispatch(setProfileErrors(data.messages))
	} else {
		if (data.messages.length !== 0) dispatch(setProfileErrors(data.messages))
	}
}

export const savePhoto = (photo: any) => async (dispatch: any) => {
	const data = await profileAPI.updatePhoto(photo)
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos))
		dispatch(setProfileErrors(data.messages))
	} else {
		if (data.messages.length !== 0) dispatch(setProfileErrors(data.messages))
	}
}

export const getStatus = (userID: number) => async (dispatch: any) => {
	const data = await profileAPI.getStatus(userID)
	dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	const data = await profileAPI.updateStatus(status)
	if (data.resultCode === 0) {
		dispatch(setStatus(status))
		dispatch(setProfileErrors(data.messages))
	} else {
		if (data.messages.length !== 0) dispatch(setProfileErrors(data.messages))
	}
}

// action creators
type savePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS
	photos: photosType
}
export const savePhotoSuccess = (photos: photosType): savePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })
type addPostType = {
	type: typeof ADD_POST
	text: string
}
export const addPost = (text: string): addPostType => ({ type: ADD_POST, text })
type deletePostType = {
	type: typeof DELETE_POST
	postID: number
}
export const deletePost = (postID: number): deletePostType => ({ type: DELETE_POST, postID })
type setUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: profileType
}
export const setUserProfile = (profile: any): setUserProfileType => ({ type: SET_USER_PROFILE, profile })
type setStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setStatus = (status: string): setStatusType => ({ type: SET_USER_STATUS, status })
type resetPageType = {
	type: typeof RESET_PAGE
}
export const resetPage = (): resetPageType => ({ type: RESET_PAGE })

export default profileReducer
