const SEND_MESSAGE = 'dialog/SEND-MESSAGE'

type dialogsType = {
	id: number
	name: string
}
type messagesType = {
	id: number
	text: string
}

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
	] as Array<dialogsType>,

	messages: [
		{ id: 1, text: 'hihi' },
		{ id: 2, text: 'how are you' },
		{ id: 3, text: 'were are you' }
	] as Array<messagesType>
}
export type initialStateType = typeof initialState

const dialogsReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case SEND_MESSAGE: {
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

type sendMessageType = {
	type: typeof SEND_MESSAGE
	message: string
}
export const sendMessage = (message: string): sendMessageType => ({ type: SEND_MESSAGE, message })

export default dialogsReducer
