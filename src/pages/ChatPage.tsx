import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// actions, thunks
import { chatActions, startMessagesListeningThunk, stopMessagesListeningThunk, sendMessageThunk } from '../redux/chatReducer'
import { AppDispatchType } from '../redux/redux-store' //types
import { getChatMessages } from '../selectors/chat-selectors' // selectors
// components
import Chat from '../components/Chat/Chat'
import Preloader from '../components/common/Preloader/Preloader'
import { useAuthNavigate } from '../hooks/useAuthNavigate'

export type TChatMessage = {
	message: string
	photo: string
	userId: number
	userName: string
}

const ChatPage = () => {
	const { checkIfAuth } = useAuthNavigate()
	useEffect(() => {
		checkIfAuth()
	}, [])
	const chatMessages = useSelector(getChatMessages)
	const dispatch = useDispatch<AppDispatchType>()

	useEffect(() => {
		dispatch(startMessagesListeningThunk())

		return () => {
			dispatch(stopMessagesListeningThunk())
			dispatch(chatActions.pageUpdated())
		}
	}, [])

	const sendMessage = (message: string) => {
		dispatch(sendMessageThunk(message))
	}

	if (chatMessages.length === 0) return <Preloader />
	return <Chat chatMessages={chatMessages} sendMessage={sendMessage} />
}

export default ChatPage
