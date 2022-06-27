const SET_LOGIN_ERRORS = 'errors/SET_LOGIN_ERRORS',
	SET_LOGIN_CAPTCHA = 'errors/SET_LOGIN_CAPTCHA',
	SET_PROFILE_ERRORS = 'errors/SET_PROFILE_ERRORS';

const initialState = {
	loginErrors: {
		messages: [],
		captchaURL: null,
	},
	profileErrors: {
		messages: [],
	},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN_ERRORS: {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					messages: action.messages,
				},
			};
		}
		case SET_LOGIN_CAPTCHA: {
			return {
				...state,
				loginErrors: {
					...state.loginErrors,
					captchaURL: action.captchaURL,
				},
			};
		}
		case SET_PROFILE_ERRORS: {
			return {
				...state,
				profileErrors: {
					...state.profileErrors,
					messages: action.messages,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export const setLoginErrors = messages => ({ type: SET_LOGIN_ERRORS, messages });
export const setLoginCaptcha = captchaURL => ({ type: SET_LOGIN_CAPTCHA, captchaURL });
export const setProfileErrors = messages => ({ type: SET_PROFILE_ERRORS, messages });

export default authReducer;
