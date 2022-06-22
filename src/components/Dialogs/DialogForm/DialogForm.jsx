import React from 'react';
import { useForm } from 'react-hook-form';

import s from './DialogForm.module.scss';

const DialogForm = props => {
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		props.sendMessage(data.message);
		resetField('message');
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.formBlock}>
				<input
					{...register('message', { required: true, maxLength: 50 })}
					className={s.input}
					type='text'
					placeholder='Print Your Text'
				/>
				<div className={`${s.error} ${errors.login && s.show}`}>
					<span>
						{errors.message?.type === 'required' &&
							'Login field is required'}
						{errors.message?.type === 'maxLength' &&
							'Password max length is 50'}
					</span>
				</div>
			</div>
			<button className={s.btn} type='submit'>
				Send
			</button>
		</form>
	);
};

export default DialogForm;
