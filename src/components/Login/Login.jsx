import React from 'react';
import { useForm } from 'react-hook-form';

import s from './Login.module.scss';
import errorStyle from '../common/styles/errors.module.scss';

const Login = props => {
	const onSubmit = data => {
		props.login(data.email, data.password, data.rememberMe);
	};

	return (
		<section className={s.loginPage}>
			<h1>Login</h1>
			<LoginForm onSubmit={onSubmit} isFormWrong={props.isFormWrong} messages={props.messages} />
		</section>
	);
};

const LoginForm = props => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	return (
		<form className={s.form} onSubmit={handleSubmit(props.onSubmit)}>
			<div className={s.formBlock}>
				<input
					{...register('email', {
						required: 'Email field is required!',
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: 'Email is wrong!',
						},
					})}
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
						maxLength: { value: 20, message: `Password max length is 20` },
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

			{props.isFormWrong && (
				<div className={errorStyle.formError}>
					{props.messages.map((text, index) => (
						<p key={index}>{text}</p>
					))}
				</div>
			)}

			<div className={`${s.formBlock} ${s.blockBtns}`}>
				<button className={s.button} onClick={() => reset()}>
					Reset
				</button>
				<button className={s.button} type='submit'>
					Login
				</button>
			</div>
		</form>
	);
};

export default Login;
