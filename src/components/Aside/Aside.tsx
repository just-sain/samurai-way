import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { getDataID } from '../../selectors/auth-selector'

import s from './Aside.module.scss'

const Aside = () => {
	const userID = useSelector(getDataID)

	const links = [
		{ path: userID ? `/profile/${userID}` : '/login', text: 'Profile' },
		{ path: '/', text: 'News' },
		{ path: '/dialogs', text: 'Dialogs' },
		{ path: '/chat', text: 'Chat' },
		{ path: '/users', text: 'Find Users' },
		{ path: '/music', text: 'Music' },
		{ path: '/settings', text: 'Settings' }
	]

	const renderLinks = links.map((link, index) => (
		<NavLink key={index} to={link.path} className={navData => (navData.isActive ? `${s.link} ${s._active}` : s.link)}>
			{link.text}
		</NavLink>
	))

	return (
		<aside className={s.aside}>
			<nav className={`${s.nav} ${s._block}`}>
				<h1 className={s._title}>Navigation</h1>
				{renderLinks}
			</nav>
		</aside>
	)
}

export default Aside
