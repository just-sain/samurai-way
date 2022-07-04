import authAPI from '../api/auth-api'
import securityAPI from '../api/security-api'

import { InferActionType, TBaseThunk } from './redux-store' // types
import { errorsActions } from './errorsReducer' // action creators

const initialState = {
	data: {
		id: null as null | number,
		login: null as null | string,
		email: null as null | string
	},
	profile: null as any,
	isAuth: false as boolean
}
type initialStateType = typeof initialState

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA': {
			return {
				...state,
				data: { id: action.id, login: action.login, email: action.email },
				isAuth: action.isAuth
			}
		}
		default: {
			return state
		}
	}
}

// action creators
type ActionType = InferActionType<typeof allActions>

export const actions = {
	setUserData: (id: null | number, login: null | string, email: null | string, isAuth: boolean) =>
		({ type: 'auth/SET_USER_DATA', id, login, email, isAuth } as const)
}

const allActions = { ...actions, ...errorsActions }

// thunks, creators?!
type ThunkType = TBaseThunk<ActionType>

export const authMe = (): ThunkType => async dispatch => {
	const data = await authAPI.getAuthMe()

	if (data.resultCode === 0) {
		const { id, login, email } = data.data
		dispatch(actions.setUserData(id, login, email, true))
	}
}

export const login =
	(email: string, password: string, rememberMe: boolean, captcha: null | string = null): ThunkType =>
	async dispatch => {
		const data = await authAPI.login(email, password, rememberMe, captcha)
		if (data.resultCode === 0) {
			dispatch(authMe())
		} else if (data.resultCode === 10) {
			dispatch(getCaptcha())
		}
		dispatch(errorsActions.setLoginErrors(data.messages))
	}

export const getCaptcha = (): ThunkType => async dispatch => {
	const data = await securityAPI.getCaptcha()
	dispatch(errorsActions.setLoginCaptcha(data.url))
}

export const logout = (): ThunkType => async dispatch => {
	const data = await authAPI.logout()

	if (data.resultCode === 0) {
		dispatch(actions.setUserData(null, null, null, false))
	}
}

export default authReducer
