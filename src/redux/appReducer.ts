import { authMeThunk } from './authReducer'
// types
import { InferActionType, TBaseThunk } from './redux-store'

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
type TThunk = TBaseThunk<ActionType, void>

export const initializeAppThunk = (): TThunk => dispatch => {
	const authMePromise = dispatch(authMeThunk())

	Promise.all([authMePromise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}

export default appReducer
