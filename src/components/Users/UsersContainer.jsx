import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import {
	requestUsers,
	changeFollow,
	toggleFollowingInProgress,
	setTotalUsersCount,
	setCurrentPage,
	resetPage,
} from '../../redux/usersReducer';
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalUsersCount,
	getIsFetching,
	getFilteredUsers,
} from '../../selectors/users-selector'; // selectors

import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

// props
const mapStateToProps = state => ({
	users: getFilteredUsers(state),
	totalUsersCount: getTotalUsersCount(state),
	pageSize: getPageSize(state),
	currentPage: getCurrentPage(state),
	isFetching: getIsFetching(state),
	followingInProgress: getFollowingInProgress(state),
});

// second container component
class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.requestUsers(this.props.currentPage, this.props.pageSize, true);
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	onChangePage = page => {
		this.props.setCurrentPage(page);
		this.props.requestUsers(page, this.props.pageSize);
	};

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					users={this.props.users}
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					followingInProgress={this.props.followingInProgress}
					onChangePage={this.onChangePage}
					changeFollow={this.props.changeFollow}
					toggleFollowingInProgress={this.props.toggleFollowingInProgress}
				/>
			</>
		);
	}
}

export default connect(mapStateToProps, {
	requestUsers,
	changeFollow,
	toggleFollowingInProgress,
	setTotalUsersCount,
	setCurrentPage,
	resetPage,
})(UsersContainer);
