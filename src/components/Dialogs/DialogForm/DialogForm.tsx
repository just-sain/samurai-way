import React from 'react'
import { useForm, useFormState, SubmitHandler } from 'react-hook-form'

import s from './DialogForm.module.scss'

type TFormValues = {
	message: string
}
type TProps = {
	sendMessage: (message: string) => void
}

const DialogForm = (props: TProps) => {
	const { register, handleSubmit, reset, control } = useForm<TFormValues>({ mode: 'onBlur' })
	const { isDirty } = useFormState({ control })

	const onSubmit: SubmitHandler<TFormValues> = data => {
		props.sendMessage(data.message)
		reset()
	}

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
	)
}

export default DialogForm
