import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'

import appReducer from './appReducer'
import authReducer from './authReducer'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import errorsReducer from './errorsReducer'

const rootReducer = combineReducers({
	// global
	app: appReducer,
	auth: authReducer,
	errors: errorsReducer,
	// pages
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer
})

// redux extension in browser
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
// @ts-ignore
window.__store__ = store

// const store = createStore(rootReducer, applyMiddleware(thunk))

export type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never // actions type
export type TBaseThunk<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A> // thunk type
// global types
export type AppStateType = ReturnType<typeof store.getState>

export default store
