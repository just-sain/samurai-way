import { authMe } from './authReducer'

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

const initialState = {
	initialized: false
}
export type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS: {
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
type initializedSuccessType = {
	type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessType => ({ type: INITIALIZED_SUCCESS })

// thunks creators
export const initializeApp = () => (dispatch: any) => {
	const authMePromise = dispatch(authMe())

	Promise.all([authMePromise]).then(() => {
		dispatch(initializedSuccess())
	})
}

export default appReducer
