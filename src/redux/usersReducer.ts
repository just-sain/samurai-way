import { usersAPI } from '../api/api'
// types
import { photosType, userType } from '../types/types'

const TOGGLE_FOLLOW = 'users/TOGGLE_FOLLOW',
	SET_USERS = 'users/SET_USERS-USERS',
	SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE-CURRENT-PAGE',
	SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
	TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS',
	TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
	RESET_PAGE = 'users/RESET_PAGE-PAGE'

const initialState = {
	users: [] as Array<userType>,
	pageSize: 12 as number,
	totalUsersCount: 0 as number,
	currentPage: 1 as number,
	followingInProgress: [] as Array<number>, // array of users id
	isFetching: false as boolean
}
export type initialStateType = typeof initialState

const usersReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case TOGGLE_FOLLOW: {
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return {
							...user,
							followed: user.followed ? false : true
						}
					}
					return user
				})
			}
		}
		case SET_USERS: {
			return {
				...state,
				users: [...action.users]
			}
		}
		case SET_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.needyPage
			}
		}
		case SET_TOTAL_USERS_COUNT: {
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		}
		case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(id => id !== action.userID)
			}
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case RESET_PAGE: {
			return initialState
		}
		default: {
			return state
		}
	}
}

// action creators
type toggleFollowType = {
	type: typeof TOGGLE_FOLLOW
	userID: number
}
export const toggleFollow = (userID: number): toggleFollowType => ({ type: TOGGLE_FOLLOW, userID })

type setUsersType = {
	type: typeof SET_USERS
	users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersType => ({ type: SET_USERS, users })

type setCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	needyPage: number
}
export const setCurrentPage = (needyPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, needyPage })

type setTotalUsersCountType = {
	type: typeof SET_TOTAL_USERS_COUNT
	usersCount: number
}
export const setTotalUsersCount = (usersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, usersCount })

type toggleFollowingInProgressType = {
	type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
	userID: number
	isFetching: boolean
}
export const toggleFollowingInProgress = (isFetching: boolean, userID: number): toggleFollowingInProgressType => ({
	type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
	isFetching,
	userID
})

type setFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const setFetching = (isFetching: boolean): setFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type resetPageType = {
	type: typeof RESET_PAGE
}
export const resetPage = (): resetPageType => ({ type: RESET_PAGE })

// thunk (we use closure)
export const requestUsers =
	(currentPage: number, pageSize: number, doSetTotalUsersCount: boolean = false) =>
	async (dispatch: any) => {
		dispatch(setFetching(true))

		const data = await usersAPI.getUsers(currentPage, pageSize)

		dispatch(setUsers(data.items))
		doSetTotalUsersCount && dispatch(setTotalUsersCount(data.totalCount))
		dispatch(setFetching(false))
	}

export const changeFollow = (doFollow: boolean, userID: number) => async (dispatch: any) => {
	dispatch(toggleFollowingInProgress(true, userID))

	// defined which method we need to use
	const apiMethod = doFollow ? await usersAPI.followUser(userID) : await usersAPI.unfollowUser(userID)

	if (apiMethod.resultCode === 0) {
		dispatch(toggleFollow(userID))
	}
	dispatch(toggleFollowingInProgress(false, userID))
}

export default usersReducer
