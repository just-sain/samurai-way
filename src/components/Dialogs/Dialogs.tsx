import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// actions
import { dialogsActions } from '../../redux/dialogsReducer'
// selectors
import { getDialogMessages, getDialogs } from '../../selectors/dialogs-selectors'
// components
import DialogForm from './DialogForm/DialogForm'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
// types
import { AppDispatchType } from '../../redux/redux-store'
// styles
import s from './Dialogs.module.scss'

const Dialogs = () => {
	const dialogs = useSelector(getDialogs)
	const messages = useSelector(getDialogMessages)

	const dispatch: AppDispatchType = useDispatch()

	const sendMessage = () => {
		dispatch(dialogsActions.sendMessage)
	}

	const dialogsFrag = dialogs.map(dialog => (
		<DialogItem key={dialog.id} id={dialog.id}>
			{dialog.name}
		</DialogItem>
	))

	const messagesFrag = messages.map(message => <MessageItem key={message.id}>{message.text}</MessageItem>)

	return (
		<section className={s.dialog}>
			<div className={s.dialogs}>
				<h1 className={s.title}>Dialogs</h1>
				{dialogsFrag}
			</div>
			<div className={s.correspondence}>
				<div className={s.messages}>{messagesFrag}</div>
				<DialogForm sendMessage={sendMessage} />
			</div>
		</section>
	)
}

export default Dialogs
