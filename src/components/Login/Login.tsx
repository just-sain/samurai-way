import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import s from './Login.module.scss'
import errorStyle from '../common/styles/errors.module.scss'

type PropsType = {
	messages: Array<string>
	captchaURL: null | string
	login: (email: string, password: string, rememberMe: boolean, captcha?: null | string) => void
}

const Login = (props: PropsType) => {
	return (
		<section className={s.loginPage}>
			<div className={s.wrapper}>
				<h3>Login</h3>
				<LoginForm login={props.login} captchaURL={props.captchaURL} messages={props.messages} />
				<p className={s.register}>
					don't have an account? <a href='https://social-network.samuraijs.com/login'>register</a>
				</p>
			</div>
		</section>
	)
}

type FormValues = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}
type FormPropsType = {
	captchaURL: null | string
	messages: Array<string>
	login: (email: string, password: string, rememberMe: boolean, captcha?: null | string) => void
}

const LoginForm = (props: FormPropsType) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({ mode: 'onBlur' })

	const onSubmit: SubmitHandler<FormValues> = data => {
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
					<input
						{...register('rememberMe')}
						className={s.checkbox}
						name='rememberMe'
						type='checkbox'
						style={{ marginRight: '1rem' }}
					/>
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

export default Login
