import React from 'react';
import { useForm } from 'react-hook-form';

import s from './Login.module.scss';
import errorStyle from '../common/styles/errors.module.scss';

const Login = props => {
	const onSubmit = data => {
		props.login(data.email, data.password, data.rememberMe, data.captcha);
	};

	return (
		<section className={s.loginPage}>
			<div className={s.wrapper}>
				<h3>Login</h3>
				<LoginForm
					onSubmit={onSubmit}
					captchaURL={props.captchaURL}
					isFormWrong={props.isFormWrong}
					messages={props.messages}
				/>
			</div>
		</section>
	);
};

const LoginForm = props => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const disableEnterKey = e => {
		if (e.keyCode == '13') {
			e.preventDefault();
		}
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(props.onSubmit)} onKeyDown={disableEnterKey}>
			<div className={s.formBlock}>
				<input
					{...register('email', {
						required: 'Email field is required!',
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: 'Email is wrong!',
						},
					})}
					autoComplete='off'
					className={s.formPasswd}
					type='text'
					placeholder='Email'
					tabIndex='1'
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
						maxLength: { value: 20, message: `Password max length is 20` },
					})}
					autoComplete='off'
					className={s.formPasswd}
					type='password'
					placeholder='Password'
					tabIndex='2'
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
						tabIndex='3'
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
							tabIndex='6'
						/>
						<div className={`${errorStyle.error} ${errors.captcha && errorStyle.show}`}>
							<span>{errors.captcha && errors.captcha.message}</span>
						</div>
					</div>
				</div>
			)}

			<div className={`${s.formBlock} ${s.blockBtns}`}>
				<button className={s.button} type='submit' tabIndex='4'>
					Login
				</button>
			</div>
		</form>
	);
};

export default Login;
