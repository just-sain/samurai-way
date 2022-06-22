import React from 'react';
import DialogForm from './DialogForm/DialogForm';

import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';

import s from './Dialogs.module.scss';

const Dialogs = props => {
	const dialogs = props.dialogs.map(dialog => (
		<DialogItem key={dialog.id} id={dialog.id}>
			{dialog.name}
		</DialogItem>
	));

	const messages = props.messages.map(message => <MessageItem key={message.id}>{message.text}</MessageItem>);

	return (
		<section className={s.dialog}>
			<div className={s.dialogs}>
				<h1 className={s.title}>Dialogs</h1>
				{dialogs}
			</div>
			<div className={s.correspondence}>
				<div className={s.messages}>{messages}</div>
				<DialogForm sendMessage={props.sendMessage} />
			</div>
		</section>
	);
};

export default Dialogs;
