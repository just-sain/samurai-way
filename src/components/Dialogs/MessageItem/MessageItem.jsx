import React from 'react';

import s from './MessageItem.module.scss';

const MessageItem = props => {
	return <p className={s.item}>{props.children}</p>
};

export default MessageItem;