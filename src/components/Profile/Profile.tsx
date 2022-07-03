import React from 'react'

import Posts from './Posts/Posts'
import User from './User/User'
import Preloader from '../common/Preloader/Preloader'

import { TPost, TProfile } from '../../types/types' // types
import s from './Profile.module.scss'

type TProps = {
	profile: null | TProfile
	status: null | string
	posts: Array<TPost>
	owner: boolean
	// dispatch
	updateStatus: (status: string) => void
	savePhoto: (photo: File) => void
}

const Profile = (props: TProps) => {
	if (!props.profile) {
		return <Preloader />
	}

	return (
		<section className={s.profile}>
			<div className={s.wrapper}>
				<User
					owner={props.owner}
					profile={props.profile}
					savePhoto={props.savePhoto}
					status={props.status}
					updateStatus={props.updateStatus}
				/>
				<Posts posts={props.posts} owner={props.owner} />
			</div>
		</section>
	)
}

export default Profile
