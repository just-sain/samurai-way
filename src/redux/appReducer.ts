import { ThunkAction } from 'redux-thunk'
import { authMe } from './authReducer'
// types
import { AppStateType, InferActionType } from './redux-store'

const initialState = {
	initialized: false
}
export type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS': {
			return {
				...state,
				initialized: true
			}
		}
		default: {
			return state
		}
	}
}

// action creators
type ActionType = InferActionType<typeof actions>

export const actions = {
	initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const)
}

// thunks creators
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

export const initializeApp = (): ThunkType => dispatch => {
	const authMePromise = dispatch(authMe())

	Promise.all([authMePromise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer
