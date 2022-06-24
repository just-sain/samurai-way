import { profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD-POST',
	DELETE_POST = 'profile/DELETE_POST',
	SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
	SET_USER_STATUS = 'profile/SET_USER_STATUS',
	SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS',
	RESET_PAGE = 'profile/RESET_PAGE';

const initialState = {
	posts: [
		{ id: 1, text: 'hi i am not a returt', likes: 10 },
		{ id: 2, text: 'hi i am returt', likes: 25 },
		{ id: 3, text: 'mmm yeah...', likes: 0 },
	],

	profile: null,
	status: null,
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: state.posts.length + 1,
				text: action.text,
				likes: 0,
			};
			return {
				...state,
				posts: [...state.posts, { ...newPost }],
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: [...state.posts.filter(post => post.id != action.postID)],
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile,
			};
		}
		case SET_USER_STATUS: {
			return {
				...state,
				status: action.status,
			};
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			};
		}
		case RESET_PAGE: {
			return {
				...initialState,
				posts: [...state.posts],
			};
		}
		default: {
			return state;
		}
	}
};

// thunks
export const getFullProfile = userID => async dispatch => {
	await dispatch(getProfile(userID));
	await dispatch(getStatus(userID));
};

export const getProfile = userID => async dispatch => {
	const data = await profileAPI.getProfile(userID);
	dispatch(setUserProfile(data));
};

export const savePhoto = photo => async dispatch => {
	const data = await profileAPI.updatePhoto(photo);
	if (data.resultCode === 0) {
		dispatch(savePhotoSuccess(data.data.photos));
	}
};

export const getStatus = userID => async dispatch => {
	const data = await profileAPI.getStatus(userID);
	dispatch(setStatus(data));
};

export const updateStatus = status => async dispatch => {
	const data = await profileAPI.updateStatus(status);
	if (data.resultCode === 0) {
		dispatch(setStatus(status));
	}
};

// action creators
export const savePhotoSuccess = photos => ({ type: SAVE_PHOTO_SUCCESS, photos });
export const addPost = text => ({ type: ADD_POST, text });
export const deletePost = postID => ({ type: DELETE_POST, postID });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_USER_STATUS, status });
export const resetPage = () => ({ type: RESET_PAGE });

export default profileReducer;
