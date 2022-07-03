import React from 'react'
// types
import { TUser } from '../../types/types'
// components
import User from './User/User'
import Pagination from '../common/Pagination/Pagination'

import s from './Users.module.scss'

type PropsType = {
	changeFollow: (doFollow: boolean, userID: number) => void
	toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
	onChangePage: (page: number) => void
	users: Array<TUser>
	totalUsersCount: number
	currentPage: number
	pageSize: number
	followingInProgress: Array<number>
}

const Users = (props: PropsType) => {
	const users = props.users.map((user: any) => (
		<User
			key={user.id}
			userID={user.id}
			smallPhoto={user.photos.small}
			name={user.name}
			followed={user.followed}
			status={user.status}
			followingInProgress={props.followingInProgress}
			changeFollow={props.changeFollow}
			toggleFollowingInProgress={props.toggleFollowingInProgress}
		/>
	))

	return (
		<section className={s.users}>
			<h1>All users</h1>
			<div className={s.nav}>
				<Pagination
					onChangePage={props.onChangePage}
					totalItemsCount={props.totalUsersCount}
					pageSize={props.pageSize}
					currentPage={props.currentPage}
				/>
			</div>
			<div>{users}</div>
		</section>
	)
}

export default Users
