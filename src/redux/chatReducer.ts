import { TBaseThunk, InferActionType } from './redux-store'
import { Dispatch } from 'redux'
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api'
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType
}
type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'chat/MESSAGES_RECEIVED': {
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))].filter(
					(m, index, array) => index >= array.length - 100
				)
			}
		}
		case 'chat/STATUS_CHANGED': {
			return {
				...state,
				status: action.payload.status
			}
		}
		case 'chat/PAGE_UPDATED': {
			return initialState
		}
		default: {
			return state
		}
	}
}

export const chatActions = {
	messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: 'chat/MESSAGES_RECEIVED', payload: { messages } } as const),
	statusChanged: (status: StatusType) => ({ type: 'chat/STATUS_CHANGED', payload: { status } } as const),
	pageUpdated: () => ({ type: 'chat/PAGE_UPDATED' } as const)
}

type ActionsType = InferActionType<typeof chatActions>

// thunks
type ThunkType = TBaseThunk<ActionsType>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = messages => {
			dispatch(chatActions.messagesReceived(messages))
		}
	}
	return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = status => {
			dispatch(chatActions.statusChanged(status))
		}
	}
	return _statusChangedHandler
}

export const startMessagesListeningThunk = (): ThunkType => async dispatch => {
	chatAPI.start()
	chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListeningThunk = (): ThunkType => async dispatch => {
	chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
	chatAPI.stop()
}

export const sendMessageThunk =
	(message: string): ThunkType =>
	async dispatch => {
		chatAPI.sendMessage(message)
	}

export default chatReducer
