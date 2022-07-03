import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import s from './PostForm.module.scss'

type TFormValues = {
	postText: string
}
type TProps = {
	addPost: (text: string) => void
}

const PostForm = (props: any) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TFormValues>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<TFormValues> = data => {
		props.addPost(data.postText)
		reset()
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.formBlock}>
				<textarea
					{...register('postText', { required: true, maxLength: 100 })}
					className={s.textarea}
					placeholder='Print something...'
				/>
				<div className={`${s.error} ${errors.postText && s.show}`}>
					<span>
						{errors.postText?.type === 'required' && 'Fill the input'}
						{errors.postText?.type === 'maxLength' && 'Text max length is 100'}
					</span>
				</div>
			</div>
			<button className={s.btn} type='submit'>
				publish
			</button>
		</form>
	)
}

export default PostForm
