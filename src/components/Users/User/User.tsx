import React from 'react'
import { NavLink } from 'react-router-dom'

import profileImage from '../../../assets/img/blank-profile-picture.webp'
import s from './User.module.scss'

type PropsType = {
	selfID: number
	userID: number
	smallPhoto: null | string
	name: string
	followed: boolean
	status: string
	followingInProgress: Array<number>
	toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
	changeFollow: (doFollow: boolean, userID: number) => void
}

const User = (props: PropsType) => {
	const buttonBlock = () => {
		if (props.userID === props.selfID) {
			return <button disabled>you</button>
		}
		return (
			<button
				disabled={props.followingInProgress.some(id => id === props.userID)}
				onClick={() => props.changeFollow(!props.followed, props.userID)}>
				{props.followed ? 'unfollow' : 'follow'}
			</button>
		)
	}

	return (
		<div className={s.user}>
			<div className={s.name}>
				<div className={s.photo}>
					<NavLink to={`/profile/${props.userID}`}>
						<img src={props.smallPhoto != null ? props.smallPhoto : profileImage} alt='' />
					</NavLink>
					<h3>{props.name}</h3>
				</div>
				{buttonBlock()}
			</div>
			<div className={s.desc}>{props.status}</div>
		</div>
	)
}

export default User
