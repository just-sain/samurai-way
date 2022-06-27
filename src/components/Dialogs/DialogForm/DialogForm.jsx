import React from 'react';
import { useForm, useFormState } from 'react-hook-form';

import s from './DialogForm.module.scss';

const DialogForm = props => {
	const { register, handleSubmit, reset, control } = useForm({ mode: 'onBlur' });
	const { isDirty } = useFormState({ control });

	const onSubmit = data => {
		props.sendMessage(data.message);
		reset();
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
			</div>
			{isDirty ? (
				<button className={s.btn} type='submit'>
					Send
				</button>
			) : (
				<button className={s.btn} type='submit' disabled>
					Send
				</button>
			)}
		</form>
	);
};

export default DialogForm;
