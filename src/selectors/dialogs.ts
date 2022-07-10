import { AppStateType } from '../redux/redux-store'

export const getDialogs = (state: AppStateType) => state.dialogsPage.dialogs
export const getDialogMessages = (state: AppStateType) => state.dialogsPage.messages
