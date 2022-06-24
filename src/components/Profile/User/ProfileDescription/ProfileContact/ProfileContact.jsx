import React from 'react';

import s from './ProfileContact.module.scss';

const ProfileContact = ({ title, link }) => (
	<a className={s.link} href={link.indexOf('http') === -1 ? `https://${link}` : link} target='_blank'>
		{title}
	</a>
);

export default ProfileContact;
