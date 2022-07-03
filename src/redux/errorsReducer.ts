import { InferActionType } from './redux-store'

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

const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case 'errors/SET_LOGIN_ERRORS': {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					messages: action.messages
				}
			}
		}
		case 'errors/SET_LOGIN_CAPTCHA': {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					captchaURL: action.captchaURL
				}
			}
		}
		case 'errors/SET_PROFILE_ERRORS': {
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
type ActionType = InferActionType<typeof errorsActions>

export const errorsActions = {
	setLoginErrors: (messages: Array<string>) => ({ type: 'errors/SET_LOGIN_ERRORS', messages } as const),
	setLoginCaptcha: (captchaURL: string) => ({ type: 'errors/SET_LOGIN_CAPTCHA', captchaURL } as const),
	setProfileErrors: (messages: Array<string>) => ({ type: 'errors/SET_PROFILE_ERRORS', messages } as const)
}

export default authReducer
