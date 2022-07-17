import { AppStateType } from '../redux/redux-store'

export const getChatMessages = (state: AppStateType) => state.chatPage.messages
