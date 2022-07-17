// import { createSelector } from 'reselect' // for difficult situation for example filter
import { TUser } from '../types/types'
import { AppStateType } from '../redux/redux-store'

// users
export const getUsers = (state: AppStateType): Array<TUser> => state.usersPage.users
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress
