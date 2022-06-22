import { authAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_FORM_ERROR = 'auth/SET_FORM_ERROR';
const RESET_LOGIN_PAGE = 'auth/RESET_LOGIN_PAGE';

const initialState = {
	data: {
		id: null,
		login: null,
		email: null,
	},
	profile: null, // it's object with fullName, picture and etc.
	isAuth: false,

	// for login page
	isFormWrong: false,
	messages: [],
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				data: { id: action.id, login: action.login, email: action.email },
				isAuth: action.isAuth,
			};
		}
		case SET_FORM_ERROR: {
			return {
				...state,
				isFormWrong: true,
				messages: action.messages,
			};
		}
		case RESET_LOGIN_PAGE: {
			return {
				...state,
				isFormWrong: false,
				messages: [],
			};
		}
		default: {
			return state;
		}
	}
};

// thunks, creators?!
export const authMe = () => async dispatch => {
	const data = await authAPI.getAuthMe();

	if (data.resultCode === 0) {
		const { id, login, email } = data.data;
		dispatch(setUserData(id, login, email, true));
	}
};

export const login = (email, password, rememberMe) => async dispatch => {
	const data = await authAPI.login(email, password, rememberMe);

	if (data.resultCode === 0) {
		dispatch(authMe());
	} else if (data.resultCode === 10) {
		alert('you should done captcha');
	} else {
		if (data.messages.length > 0) {
			dispatch(setFormError(data.messages));
		}
	}
};

export const logout = () => async dispatch => {
	const data = await authAPI.logout();

	if (data.resultCode === 0) {
		dispatch(setUserData(null, null, null, false));
	}
};

// action creators
export const setUserData = (id, login, email, isAuth) => ({
	type: SET_USER_DATA,
	id,
	login,
	email,
	isAuth,
});
export const setFormError = messages => ({ type: SET_FORM_ERROR, messages });
export const resetLoginPage = () => ({ type: RESET_LOGIN_PAGE });

export default authReducer;
