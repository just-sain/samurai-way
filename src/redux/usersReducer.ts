import usersAPI from '../api/users-api' // api
// types
import { TUser } from '../types/types'
import { InferActionType, TBaseThunk } from './redux-store'

const initialState = {
	users: [] as Array<TUser>,
	pageSize: 12 as number,
	totalUsersCount: 0 as number,
	currentPage: 1 as number,
	followingInProgress: [] as Array<number>, // array of users id
	isFetching: false as boolean
}
export type initialStateType = typeof initialState

const usersReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case 'users/TOGGLE_FOLLOW': {
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
		case 'users/SET_USERS': {
			return {
				...state,
				users: [...action.users]
			}
		}
		case 'users/SET_CURRENT_PAGE': {
			return {
				...state,
				currentPage: action.needyPage
			}
		}
		case 'users/SET_TOTAL_USERS_COUNT': {
			return {
				...state,
				totalUsersCount: action.usersCount
			}
		}
		case 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS': {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(id => id !== action.userID)
			}
		}
		case 'users/TOGGLE_IS_FETCHING': {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case 'users/RESET_PAGE': {
			return initialState
		}
		default: {
			return state
		}
	}
}

// action creators
type ActionType = InferActionType<typeof actions>

export const actions = {
	toggleFollow: (userID: number) => ({ type: 'users/TOGGLE_FOLLOW', userID } as const),
	setUsers: (users: Array<TUser>) => ({ type: 'users/SET_USERS', users } as const),
	setCurrentPage: (needyPage: number) => ({ type: 'users/SET_CURRENT_PAGE', needyPage } as const),
	setTotalUsersCount: (usersCount: number) => ({ type: 'users/SET_TOTAL_USERS_COUNT', usersCount } as const),
	toggleFollowingInProgress: (isFetching: boolean, userID: number) =>
		({
			type: 'users/TOGGLE_IS_FOLLOWING_IN_PROGRESS',
			isFetching,
			userID
		} as const),
	setFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
	resetPage: () => ({ type: 'users/RESET_PAGE' } as const)
}

// thunk (we use closure)
type ThunkType = TBaseThunk<ActionType>

export const requestUsers =
	(currentPage: number, pageSize: number, doSetTotalUsersCount: boolean, term: string, friend: null | boolean): ThunkType =>
	async dispatch => {
		dispatch(actions.setFetching(true))

		const data = await usersAPI.getUsers(currentPage, pageSize, term, friend)

		dispatch(actions.setUsers(data.items))
		doSetTotalUsersCount && dispatch(actions.setTotalUsersCount(data.totalCount))
		dispatch(actions.setFetching(false))
	}

export const changeFollow =
	(doFollow: boolean, userID: number): ThunkType =>
	async dispatch => {
		dispatch(actions.toggleFollowingInProgress(true, userID))

		// defined which method we need to use
		const data = doFollow ? await usersAPI.followUser(userID) : await usersAPI.unfollowUser(userID)

		if (data.resultCode === 0) {
			dispatch(actions.toggleFollow(userID))
		}
		dispatch(actions.toggleFollowingInProgress(false, userID))
	}

export default usersReducer
