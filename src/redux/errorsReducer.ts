const SET_LOGIN_ERRORS = 'errors/SET_LOGIN_ERRORS',
	SET_LOGIN_CAPTCHA = 'errors/SET_LOGIN_CAPTCHA',
	SET_PROFILE_ERRORS = 'errors/SET_PROFILE_ERRORS'

const initialState = {
	loginErrors: {
		messages: [] as Array<string>,
		captchaURL: null as null | string
	},
	profileErrors: {
		messages: [] as Array<string>
	}
}
export type initialStateType = typeof initialState

const authReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case SET_LOGIN_ERRORS: {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					messages: action.messages
				}
			}
		}
		case SET_LOGIN_CAPTCHA: {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					captchaURL: action.captchaURL
				}
			}
		}
		case SET_PROFILE_ERRORS: {
			return {
				...state,
				profileErrors: {
					...state.profileErrors,
					messages: action.messages
				}
			}
		}
		default: {
			return state
		}
	}
}

// action creators
type setLoginErrorsType = {
	type: typeof SET_LOGIN_ERRORS
	messages: Array<string>
}
export const setLoginErrors = (messages: Array<string>): setLoginErrorsType => ({ type: SET_LOGIN_ERRORS, messages })
type setLoginCaptchaType = {
	type: typeof SET_LOGIN_CAPTCHA
	captchaURL: null | string
}
export const setLoginCaptcha = (captchaURL: string): setLoginCaptchaType => ({ type: SET_LOGIN_CAPTCHA, captchaURL })
type setProfileErrorsType = {
	type: typeof SET_PROFILE_ERRORS
	messages: Array<string>
}
export const setProfileErrors = (messages: Array<string>): setProfileErrorsType => ({ type: SET_PROFILE_ERRORS, messages })

export default authReducer
