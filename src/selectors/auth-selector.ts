// import { createSelector } from 'reselect' // for difficult situation for example filter
import { AppStateType } from '../redux/redux-store'

export const getAuth = (state: AppStateType) => state.auth.isAuth
export const getData = (state: AppStateType) => state.auth.data
export const getProfile = (state: AppStateType) => state.auth.profile
export const getDataID = (state: AppStateType) => state.auth.data.id
