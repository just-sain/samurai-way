import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
// actions thunks
import { loginThunk } from '../../redux/authReducer'
// selectors
import { getAuth, getCaptchaURL, getDataID, getLoginErrorMessages } from '../../selectors/auth-selectors'
// types
import { AppDispatchType } from '../../redux/redux-store'
// component
import Form from './Form/Form'
// styles
import s from './Login.module.scss'

const Login = () => {
	const isAuth = useTypedSelector(getAuth),
		userID = useTypedSelector(getDataID),
		messages = useTypedSelector(getLoginErrorMessages),
		captchaURL = useTypedSelector(getCaptchaURL)

	const dispatch = useDispatch<AppDispatchType>()

	const login = (email: string, password: string, rememberMe: boolean, captcha?: null | string) => {
		dispatch(loginThunk(email, password, rememberMe, captcha))
	}

	if (isAuth) {
		return <Navigate to={`/profile/${userID}`} />
	}
	return (
		<section className={s.loginPage}>
			<div className={s.wrapper}>
				<h3>Login</h3>
				<Form login={login} captchaURL={captchaURL} messages={messages} />
				<p className={s.register}>
					don't have an account? <a href='https://social-network.samuraijs.com/login'>register</a>
				</p>
			</div>
		</section>
	)
}

export default Login
