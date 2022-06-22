import React from 'react';

import User from './User/User';
import Pagination from '../common/Pagination/Pagination';
import s from './Users.module.scss';

const Users = props => {
	const users = props.users.map(user => (
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
	));

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
	);
};

export default Users;
