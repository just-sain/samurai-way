const SET_LOGIN_ERRORS = 'errors/SET_LOGIN_ERRORS',
	SET_PROFILE_SETTINGS_ERRORS = 'errors/SET_PROFILE_SETTINGS_ERRORS';

const initialState = {
	loginMessages: [],
	profileMessages: [],
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN_ERRORS: {
			return {
				...state,
				loginMessages: action.messages,
			};
		}
		case SET_PROFILE_SETTINGS_ERRORS: {
			return {
				...state,
				profileMessages: action.messages,
			};
		}
		default: {
			return state;
		}
	}
};

export const setLoginErrors = messages => ({ type: SET_LOGIN_ERRORS, messages });
export const setProfileErrors = messages => ({ type: SET_PROFILE_SETTINGS_ERRORS, messages });

export default authReducer;
