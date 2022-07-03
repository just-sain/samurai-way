import { ThunkAction } from 'redux-thunk'
import profileAPI from '../api/profile-api' // api
// types
import { TPhotos, TPost, TProfile, TUpdateProfile } from '../types/types'
import { AppStateType, InferActionType } from './redux-store'
// action creators
import { errorsActions } from './errorsReducer'

const initialState = {
	posts: [
		{ id: 1, text: 'hi i am not a moron', likes: 10 },
		{ id: 2, text: 'hi i am moron', likes: 25 },
		{ id: 3, text: 'mmm yeah...', likes: 0 }
	] as Array<TPost>,

	profile: null as null | TProfile,
	status: null as null | string
}
export type initialStateType = typeof initialState

const profileReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case 'profile/ADD_POST': {
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
		case 'profile/DELETE_POST': {
			return {
				...state,
				posts: [...state.posts.filter(post => post.id !== action.postID)]
			}
		}
		case 'profile/SET_USER_PROFILE': {
			return {
				...state,
				profile: action.profile
			}
		}
		case 'profile/SET_USER_STATUS': {
			return {
				...state,
				status: action.status
			}
		}
		case 'profile/SAVE_PHOTO_SUCCESS': {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as TProfile
			}
		}
		case 'profile/RESET_PAGE': {
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

// action creators
type ActionType = InferActionType<typeof allActions>

export const profileActions = {
	savePhotoSuccess: (photos: TPhotos) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const),
	addPost: (text: string) => ({ type: 'profile/ADD_POST', text } as const),
	deletePost: (postID: number) => ({ type: 'profile/DELETE_POST', postID } as const),
	setUserProfile: (profile: any) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
	setStatus: (status: string) => ({ type: 'profile/SET_USER_STATUS', status } as const),
	resetPage: () => ({ type: 'profile/RESET_PAGE' } as const)
}

const allActions = { ...profileActions, ...errorsActions }

// thunk creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getFullProfile =
	(userID: number): ThunkType =>
	async dispatch => {
		await dispatch(getProfile(userID))
		await dispatch(getStatus(userID))
	}

export const getProfile =
	(userID: number): ThunkType =>
	async dispatch => {
		const data = await profileAPI.getProfile(userID)
		dispatch(profileActions.setUserProfile(data))
	}

export const saveProfile =
	(profileData: TUpdateProfile): ThunkType =>
	async (dispatch, getState) => {
		let id: null | number = getState().auth.data.id
		if (!id) id = 0

		const data = await profileAPI.updateProfile(profileData)

		if (data.resultCode === 0) {
			dispatch(getFullProfile(id))
		}
		dispatch(errorsActions.setProfileErrors(data.messages))
	}

export const savePhoto =
	(photo: File): ThunkType =>
	async dispatch => {
		const data = await profileAPI.updatePhoto(photo)
		if (data.resultCode === 0) {
			dispatch(profileActions.savePhotoSuccess(data.data.photos))
		}
		dispatch(errorsActions.setProfileErrors(data.messages))
	}

export const getStatus =
	(userID: number): ThunkType =>
	async dispatch => {
		const data = await profileAPI.getStatus(userID)
		dispatch(profileActions.setStatus(data))
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		const data = await profileAPI.updateStatus(status)
		if (data.resultCode === 0) {
			dispatch(profileActions.setStatus(status))
		}
		dispatch(errorsActions.setProfileErrors(data.messages))
	}

export default profileReducer
