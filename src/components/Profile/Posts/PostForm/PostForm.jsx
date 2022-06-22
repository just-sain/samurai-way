import React from 'react';
import { useForm } from 'react-hook-form';

import s from './PostForm.module.scss';

const PostForm = props => {
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = data => {
		props.addPost(data.postText);
		resetField('postText');
	};

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
	);
};

export default PostForm;
