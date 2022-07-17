import { AppStateType } from '../redux/redux-store'

export const getAuth = (state: AppStateType) => state.auth.isAuth
export const getData = (state: AppStateType) => state.auth.data
export const getProfile = (state: AppStateType) => state.auth.profile
export const getDataID = (state: AppStateType) => state.auth.data.id
export const getCaptchaURL = (state: AppStateType) => state.errors.loginErrors.captchaURL
export const getLoginErrorMessages = (state: AppStateType) => state.errors.loginErrors.messages
