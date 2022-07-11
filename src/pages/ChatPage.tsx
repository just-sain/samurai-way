import React, { useEffect, useLayoutEffect, useState } from 'react'
import Chat from '../components/Chat/Chat'
import Preloader from '../components/common/Preloader/Preloader'

let ws: WebSocket

const connect = () => {
	ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
}

export type TChatMessage = {
	message: string
	photo: string
	userId: number
	userName: string
}

const ChatPage = () => {
	const [chatMessages, setChatMessages] = useState<[] | TChatMessage[]>([])
	const [isReady, setIsReady] = useState<boolean>(false)

	const sendMessage = (message: string) => {
		ws.send(message)
	}

	useLayoutEffect(() => {
		connect()
	}, [])

	useEffect(() => {
		ws.onopen = () => {
			setIsReady(true)
		}

		ws.onclose = () => {
			console.warn('closed')
			setTimeout(connect, 3000)
		}

		ws.onmessage = e => {
			let data = JSON.parse(e.data)
			setChatMessages(prevMessages => [...prevMessages, ...data])
		}
	}, [])

	if (chatMessages.length === 0) return <Preloader />
	return <Chat isReady={isReady} chatMessages={chatMessages} sendMessage={sendMessage} />
}

export default ChatPage
