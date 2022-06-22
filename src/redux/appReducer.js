import { authMe } from './authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZED_SUCCESS: {
			return {
				...state,
				initialized: true,
			};
		}
		default: {
			return state;
		}
	}
};

// thunks creators
export const initializeApp = () => dispatch => {
	const authMePromise = dispatch(authMe());

	Promise.all([authMePromise]).then(() => {
		dispatch(initializedSuccess());
	});
};
// action creators
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export default appReducer;
