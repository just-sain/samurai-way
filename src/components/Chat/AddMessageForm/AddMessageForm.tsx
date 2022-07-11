import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import errorStyle from '../../../assets/styles/errors.module.scss'

type TFormValues = {
	message: string
}
type TProps = {
	isReady: boolean
	sendMessage: (message: string) => void
}

const AddMessageForm = (props: TProps) => {
	const {
		register,
		resetField,
		handleSubmit,
		formState: { errors }
	} = useForm<TFormValues>()

	const onSubmit: SubmitHandler<TFormValues> = data => {
		props.sendMessage(data.message)
		resetField('message')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<input
					{...register('message', { required: 'for send the message pls fill the input' })}
					className='mt-14 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					type='text'
					autoComplete='off'
					style={{ fontSize: '1.4rem' }}
					placeholder='your text...'
				/>
				<div className={`${errorStyle.error} ${errors.message && errorStyle.showTop}`}>
					<span>{errors.message && errors.message.message}</span>
				</div>
			</div>
			<button
				disabled={!props.isReady}
				className='text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-gray-900 border-2 border-indigo-400'
				type='submit'>
				send
			</button>
		</form>
	)
}

export default AddMessageForm
