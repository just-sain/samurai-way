import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
// thunks
import { logoutThunk } from '../../redux/authReducer'
// selectors
import { getAuth, getData, getProfile } from '../../selectors/auth-selectors'
// types
import { AppDispatchType } from '../../redux/redux-store'
// styles
import { classNames } from '../../index'
import s from './Header.module.scss'
import logo from '../../assets/img/logo.svg'

const Header = () => {
	const data = useSelector(getData)
	const isAuth = useSelector(getAuth)

	const dispatch: AppDispatchType = useDispatch()

	const logout = () => dispatch(logoutThunk())

	const loginBlock = () => (
		<div className={s.loginBlock}>
			{isAuth ? (
				<>
					<NavLink to={`/profile/${data.id}`} className={s.userName}>
						{data.login}
					</NavLink>
					<NavLink to={`/login`} onClick={logout} className={`${s.signOut} ${s.authElem}`}>
						sign out
					</NavLink>
				</>
			) : (
				<NavLink to='/login' className={`${s.signUp} ${s.authElem}`}>
					sign up
				</NavLink>
			)}
		</div>
	)

	return (
		<header className={s.header}>
			<NavLink to='/' className={s.logo}>
				<img src={logo} alt='' />
				<h1 className={s.title}>Samurai Way</h1>
			</NavLink>
			{loginBlock()}
		</header>
	)
}

export default Header
