import { authAPI, security } from '../api/api'
import { setLoginCaptcha, setLoginErrors } from './errorsReducer'

const SET_USER_DATA = 'auth/SET_USER_DATA'

const initialState = {
	data: {
		id: null as null | number,
		login: null as null | string,
		email: null as null | string
	},
	profile: null as any,
	isAuth: false
}

export type initialStateType = typeof initialState

const authReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case SET_USER_DATA: {
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

// thunks, creators?!
export const authMe = () => async (dispatch: any) => {
	const data = await authAPI.getAuthMe()

	if (data.resultCode === 0) {
		const { id, login, email } = data.data
		dispatch(setUserData(id, login, email, true))
	}
}

export const login =
	(email: string, password: string, rememberMe: boolean, captcha = null) =>
	async (dispatch: any) => {
		const data = await authAPI.login(email, password, rememberMe, captcha)

		if (data.resultCode === 0) {
			dispatch(authMe())
			dispatch(setLoginErrors(data.messages))
		} else if (data.resultCode === 10) {
			dispatch(getCaptcha())
			dispatch(setLoginErrors(data.messages))
		} else {
			if (data.messages.length !== 0) dispatch(setLoginErrors(data.messages))
		}
	}

export const getCaptcha = () => async (dispatch: any) => {
	const data = await security.getCaptcha()
	dispatch(setLoginCaptcha(data.url))
}

export const logout = () => async (dispatch: any) => {
	const data = await authAPI.logout()

	if (data.resultCode === 0) {
		dispatch(setUserData(null, null, null, false))
	}
}

// action creators
type setUserDataType = {
	type: typeof SET_USER_DATA
	isAuth: boolean
	id: null | number
	login: null | string
	email: null | string
}

export const setUserData = (id: null | number, login: null | string, email: null | string, isAuth: boolean): setUserDataType => ({
	type: SET_USER_DATA,
	id,
	login,
	email,
	isAuth
})

export default authReducer
