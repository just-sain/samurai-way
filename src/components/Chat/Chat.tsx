import React from 'react'
// components
import AddMessageForm from './AddMessageForm/AddMessageForm'
import Messages from './Messages/Messages'
// types
import { TChatMessage } from '../../pages/ChatPage'

type TProps = {
	sendMessage: (message: string) => void
	chatMessages: TChatMessage[]
}

const Chat = (props: TProps) => {
	return (
		<section className='p-10 flex' style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch' }}>
			<Messages messages={props.chatMessages} />
			<AddMessageForm sendMessage={props.sendMessage} />
		</section>
	)
}

export default Chat
