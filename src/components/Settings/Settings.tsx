import React from 'react'
import { NavLink } from 'react-router-dom'

import s from './Settings.module.scss'

const Settings = () => {
	return (
		<section className={s.section}>
			<h1 className={s.title}>Settings</h1>
			<div className={s.content}>
				<NavLink className={s.link} to='profile'>
					Profile settings
				</NavLink>
				<NavLink className={s.link} to='/error'>
					Error Page
				</NavLink>
			</div>
		</section>
	)
}

export default Settings
