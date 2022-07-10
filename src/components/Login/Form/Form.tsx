import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './Form.module.scss'
import errorStyle from '../../../assets/styles/errors.module.scss'

type TFormValues = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}
type TProps = {
	captchaURL: null | string
	messages: Array<string>
	login: (email: string, password: string, rememberMe: boolean, captcha?: null | string) => void
}

const Form = (props: TProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TFormValues>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<TFormValues> = data => {
		props.login(data.email, data.password, data.rememberMe, data.captcha)
	}

	const disableEnterKey = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key == 'Enter') {
			e.preventDefault()
		}
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)} onKeyDown={disableEnterKey}>
			<div className={s.formBlock}>
				<input
					{...register('email', {
						required: 'Email field is required!',
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: 'Email is wrong!'
						}
					})}
					// autoComplete='off' // off suggestions
					className={s.formPasswd}
					type='text'
					placeholder='Email'
				/>
				<div className={`${errorStyle.error} ${errors.email && errorStyle.show}`}>
					<span>{errors.email && errors.email.message}</span>
				</div>
			</div>
			<div className={s.formBlock}>
				<input
					{...register('password', {
						required: 'Password field is required!',
						minLength: { value: 4, message: `Password max length is 4` },
						maxLength: { value: 20, message: `Password max length is 20` }
					})}
					className={s.formPasswd}
					type='password'
					placeholder='Password'
				/>
				<div className={`${errorStyle.error} ${errors.password && errorStyle.show}`}>
					<span>{errors.password && errors.password.message}</span>
				</div>
			</div>
			<div className={s.formBlock}>
				<label>
					<input {...register('rememberMe')} className={s.checkbox} name='rememberMe' type='checkbox' style={{ marginRight: '1rem' }} />
					Remember Me
				</label>
			</div>

			{/* form errors */}
			{props.messages.length !== 0 && (
				<div className={errorStyle.formError}>
					{props.messages.map((text, index) => (
						<p key={index}>{text}</p>
					))}
				</div>
			)}
			{props.captchaURL && (
				<div className={`${s.formBlock} ${s.blockCaptcha}`}>
					<h3>Complete the captcha</h3>
					<img src={props.captchaURL} alt='' />
					<div className={s.formBlock}>
						<input
							{...register('captcha', { required: 'Captcha field is required!' })}
							autoComplete='off'
							className={s.checkbox}
							name='captcha'
							type='text'
						/>
						<div className={`${errorStyle.error} ${errors.captcha && errorStyle.show}`}>
							<span>{errors.captcha && errors.captcha.message}</span>
						</div>
					</div>
				</div>
			)}

			<div className={`${s.formBlock} ${s.blockBtns}`}>
				<button className={s.button} type='submit'>
					Login
				</button>
			</div>
		</form>
	)
}

export default Form
