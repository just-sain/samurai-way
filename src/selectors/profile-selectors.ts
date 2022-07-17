import { AppStateType } from '../redux/redux-store'

export const getProfile = (state: AppStateType) => state.profilePage.profile
export const getStatus = (state: AppStateType) => state.profilePage.status
export const getPosts = (state: AppStateType) => state.profilePage.posts
export const getErrorMessages = (state: AppStateType) => state.errors.profileErrors.messages
