import { TDialogs, TMessages } from '../types/types'
import { InferActionType } from './redux-store'

const initialState = {
	dialogs: [
		{ id: 1, name: 'marmok' },
		{ id: 2, name: 'soi' },
		{ id: 3, name: 'dosya' },
		{ id: 4, name: 'viktor' },
		{ id: 5, name: 'ubuntu' },
		{ id: 6, name: 'vasily' },
		{ id: 7, name: 'zhanaya' },
		{ id: 8, name: 'aisere' },
		{ id: 9, name: 'andrei' },
		{ id: 10, name: 'katerina' }
	] as Array<TDialogs>,

	messages: [
		{ id: 1, text: 'hihi' },
		{ id: 2, text: 'how are you' },
		{ id: 3, text: 'were are you' }
	] as Array<TMessages>
}
export type initialStateType = typeof initialState

const dialogsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
	switch (action.type) {
		case 'dialog/SEND_MESSAGE': {
			const newMessage = {
				id: state.messages.length + 1,
				text: action.message
			}
			return {
				...state,
				messages: [...state.messages, { ...newMessage }]
			}
		}
		default: {
			return state
		}
	}
}

// action creators
type ActionType = InferActionType<typeof dialogsActions>

export const dialogsActions = {
	sendMessage: (message: string) => ({ type: 'dialog/SEND_MESSAGE', message } as const)
}

export default dialogsReducer
