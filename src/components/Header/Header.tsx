import React from 'react'
import { NavLink } from 'react-router-dom'
// types
import { dataType, profileType } from '../../types/types'

import logo from '../../assets/img/logo.svg'
import s from './Header.module.scss'

type PropType = {
	data: dataType
	profile: profileType
	isAuth: boolean
	logout: () => void
}

const Header = (props: PropType) => {
	const loginBlock = () => {
		if (props.isAuth) {
			return (
				<div className={s.loginBlock}>
					<NavLink to={`/profile/${props.data.id}`} className={s.userName}>
						{props.data.login}
					</NavLink>
					<NavLink to={`/login`} onClick={props.logout} className={`${s.signOut} ${s.authElem}`}>
						sign out
					</NavLink>
				</div>
			)
		} else {
			return (
				<div className={s.loginBlock}>
					<NavLink to='/login' className={`${s.signUp} ${s.authElem}`}>
						sign up
					</NavLink>
				</div>
			)
		}
	}

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
