import React from 'react'
import { connect } from 'react-redux'
// types
import { AppStateType } from '../../redux/redux-store'
import { TUser } from '../../types/types'
// smt
import { requestUsers, changeFollow, toggleFollowingInProgress, setCurrentPage, resetPage } from '../../redux/usersReducer'
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalUsersCount,
	getIsFetching,
	getUsers
} from '../../selectors/users-selector' // selectors

import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

type OwnPropsType = {}

type MapStatePropsType = {
	users: Array<TUser>
	totalUsersCount: number
	currentPage: number
	pageSize: number
	isFetching: boolean
	followingInProgress: Array<number>
}

type MapDispatchPropsType = {
	requestUsers: (currentPage: number, pageSize: number, doSetTotalUsersCount?: boolean) => void
	resetPage: () => void
	setCurrentPage: (needyPage: number) => void
	changeFollow: (doFollow: boolean, userID: number) => void
	toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

// second container component
class UsersContainer extends React.PureComponent<PropsType> {
	componentDidMount() {
		this.props.requestUsers(this.props.currentPage, this.props.pageSize, true)
	}

	componentWillUnmount() {
		this.props.resetPage()
	}

	onChangePage = (page: number) => {
		this.props.setCurrentPage(page)
		this.props.requestUsers(page, this.props.pageSize)
	}

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
		)
	}
}

// props
const mapStateToProps = (state: AppStateType) => ({
	users: getUsers(state),
	totalUsersCount: getTotalUsersCount(state),
	pageSize: getPageSize(state),
	currentPage: getCurrentPage(state),
	isFetching: getIsFetching(state),
	followingInProgress: getFollowingInProgress(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
	requestUsers,
	changeFollow,
	toggleFollowingInProgress,
	setCurrentPage,
	resetPage
})(UsersContainer)
