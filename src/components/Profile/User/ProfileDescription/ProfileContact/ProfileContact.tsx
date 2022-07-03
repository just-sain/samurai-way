import React from 'react'

import s from './ProfileContact.module.scss'

type TProps = {
	title: string
	link: string
}

const ProfileContact = ({ title, link }: TProps) => (
	<a className={s.link} href={link.indexOf('http') === -1 ? `https://${link}` : link} target='_blank'>
		{title}
	</a>
)

export default ProfileContact
