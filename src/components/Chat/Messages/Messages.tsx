import React from 'react'

import Message from './Message/Message'
import { TChatMessage } from '../../../pages/ChatPage'

type TProps = {
	messages: TChatMessage[]
}

const Messages = (props: TProps) => {
	const messages = props.messages.map((message, i) => (
		<Message key={i} userName={message.userName} photo={message.photo} message={message.message} />
	))

	return <div style={{ height: '60vh', overflowY: 'auto' }}>{messages}</div>
}

export default Messages
