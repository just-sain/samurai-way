import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './Aside.module.scss';

const Aside = props => {
	const links = [
		{ path: props.userID ? `/profile/${props.userID}` : '/login', text: 'Profile' },
		{ path: '/dialogs', text: 'Dialogs' },
		{ path: '/', text: 'News' },
		{ path: '/users', text: 'Find Users' },
		{ path: '/music', text: 'Music' },
		{ path: '/settings', text: 'Setting' },
	];

	const renderLinks = links.map((link, index) => (
		<NavLink
			key={index}
			to={link.path}
			className={navData => (navData.isActive ? `${s.link} ${s._active}` : s.link)}>
			{link.text}
		</NavLink>
	));

	return (
		<aside className={s.aside}>
			<nav className={`${s.nav} ${s._block}`}>
				<h1 className={s._title}>Navigation</h1>
				{renderLinks}
			</nav>
		</aside>
	);
};

export default Aside;
