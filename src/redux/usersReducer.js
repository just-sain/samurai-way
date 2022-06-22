import { usersAPI } from '../api/api';

const TOGGLE_FOLLOW = 'users/TOGGLE_FOLLOW',
	SET_USERS = 'users/SET_USERS-USERS',
	SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE-CURRENT-PAGE',
	SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
	TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS',
	TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
	RESET_PAGE = 'users/RESET_PAGE-PAGE';

const initialState = {
	users: [],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	followingInProgress: [],
	isFetching: false,
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FOLLOW: {
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return {
							...user,
							followed: user.followed ? false : true,
						};
					}
					return user;
				}),
			};
		}
		case SET_USERS: {
			return {
				...state,
				users: [...action.users],
			};
		}
		case SET_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.needyPage,
			};
		}
		case SET_TOTAL_USERS_COUNT: {
			return {
				...state,
				totalUsersCount: action.usersCount,
			};
		}
		case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(id => id !== action.userID),
			};
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching,
			};
		}
		case RESET_PAGE: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

// thunk (we use closure)
export const requestUsers =
	(currentPage, pageSize, doSetTotalUsersCount = false) =>
	async dispatch => {
		dispatch(setFetching(true));

		const data = await usersAPI.getUsers(currentPage, pageSize);

		dispatch(setUsers(data.items));
		doSetTotalUsersCount && dispatch(setTotalUsersCount(data.totalCount));
		dispatch(setFetching(false));
	};

export const changeFollow = (doFollow, userID) => async dispatch => {
	dispatch(toggleFollowingInProgress(true, userID));

	// defined which method we need to use
	const apiMethod = doFollow ? await usersAPI.followUser(userID) : await usersAPI.unfollowUser(userID);

	if (apiMethod.resultCode === 0) {
		dispatch(toggleFollow(userID));
	}
	dispatch(toggleFollowingInProgress(false, userID));
};

// action creators
export const toggleFollow = userID => ({ type: TOGGLE_FOLLOW, userID });
export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = needyPage => ({
	type: SET_CURRENT_PAGE,
	needyPage,
});
export const setTotalUsersCount = usersCount => ({
	type: SET_TOTAL_USERS_COUNT,
	usersCount,
});
export const toggleFollowingInProgress = (isFetching, userID) => ({
	type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
	isFetching,
	userID,
});
export const setFetching = isFetching => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const resetPage = () => ({ type: RESET_PAGE });

export default usersReducer;
