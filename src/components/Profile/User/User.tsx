import React from 'react'

import ProfileDescription from './ProfileDescription/ProfileDescription'
import ProfileAvatar from './ProfileAvatar/ProfileAvatar'

import { TContacts, TPhotos, TProfile } from '../../../types/types' // types
import s from './User.module.scss'

type TProps = {
	profile: null | TProfile
	status: null | string
	owner: boolean
	// dispatch
	updateStatus: (status: string) => void
	savePhoto: (photo: File) => void
}

const User = (props: TProps) => {
	return (
		<div className={s.user}>
			<ProfileAvatar owner={props.owner} savePhoto={props.savePhoto} profilePhotos={props.profile?.photos as TPhotos} />
			<ProfileDescription
				owner={props.owner}
				fullName={props.profile?.fullName as string}
				aboutMe={props.profile?.aboutMe as string}
				lookingForAJob={props.profile?.lookingForAJob as boolean}
				lookingForAJobDescription={props.profile?.lookingForAJobDescription as string}
				status={props.status}
				contacts={props.profile?.contacts as TContacts}
				updateStatus={props.updateStatus}
			/>
		</div>
	)
}

export default User
