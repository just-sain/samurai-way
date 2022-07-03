import React from 'react'

import s from './MessageItem.module.scss'

type TProps = {
	children: React.ReactNode
}

const MessageItem = (props: TProps) => {
	return <p className={s.item}>{props.children}</p>
}

export default MessageItem
