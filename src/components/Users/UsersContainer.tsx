import React from 'react'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
// types
import { AppStateType } from '../../redux/redux-store'
import { TUser } from '../../types/types'
// smt
import { actions, requestUsers, changeFollow } from '../../redux/usersReducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getIsFetching, getUsers } from '../../selectors/users-selector' // selectors

import Preloader from '../common/Preloader/Preloader'
import Users from './Users'

type TOwnProps = {
	searchTerm: string
	searchFriend: null | boolean
}
type PropsType = TMapStateProps & TMapDispatchProps & TOwnProps

// second container component
class UsersContainer extends React.PureComponent<PropsType> {
	componentDidMount() {
		this.props.requestUsers(this.props.currentPage, this.props.pageSize, true, this.props.searchTerm, this.props.searchFriend)
	}

	componentWillUnmount() {
		this.props.resetPage()
	}

	onChangePage = (page: number) => {
		this.props.setCurrentPage(page)
		this.props.requestUsers(page, this.props.pageSize, false, this.props.searchTerm, this.props.searchFriend)
	}

	onSearchUsers = (search: string, friend: null | boolean) => {
		this.props.setCurrentPage(1)
		this.props.requestUsers(1, this.props.pageSize, true, search, friend)
	}

	render() {
		if (this.props.isFetching) return <Preloader />
		return (
			<Users
				selfID={this.props.selfID as number}
				users={this.props.users}
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				followingInProgress={this.props.followingInProgress}
				changeFollow={this.props.changeFollow}
				toggleFollowingInProgress={this.props.toggleFollowingInProgress}
				onChangePage={this.onChangePage}
				onSearchUsers={this.onSearchUsers}
			/>
		)
	}
}

type TSearchParamsProps = TMapStateProps & TMapDispatchProps

const SearchParams = (props: TSearchParamsProps) => {
	const [searchParams] = useSearchParams()
	const searchTerm = searchParams.get('search') || ''
	const searchFriend = searchParams.get('friend') || ''

	let resultFriend: null | boolean = null
	if (searchFriend === 'true') resultFriend = true
	else if (searchFriend === 'false') resultFriend = false
	else resultFriend = null

	return <UsersContainer {...props} searchTerm={searchTerm} searchFriend={resultFriend} />
}

// props
type TMapStateProps = {
	users: Array<TUser>
	totalUsersCount: number
	currentPage: number
	pageSize: number
	isFetching: boolean
	followingInProgress: Array<number>
	selfID: null | number
}
const mapStateToProps = (state: AppStateType) => ({
	users: getUsers(state),
	totalUsersCount: getTotalUsersCount(state),
	pageSize: getPageSize(state),
	currentPage: getCurrentPage(state),
	isFetching: getIsFetching(state),
	followingInProgress: getFollowingInProgress(state),
	selfID: state.auth.data.id
})
type TMapDispatchProps = {
	requestUsers: (currentPage: number, pageSize: number, doSetTotalUsersCount: boolean, term: string, friend: null | boolean) => void
	resetPage: () => void
	setCurrentPage: (needyPage: number) => void
	changeFollow: (doFollow: boolean, userID: number) => void
	toggleFollowingInProgress: (isFetching: boolean, userID: number) => void
}

const { toggleFollowingInProgress, setCurrentPage, resetPage } = actions

export default connect<TMapStateProps, TMapDispatchProps, {}, AppStateType>(mapStateToProps, {
	requestUsers,
	changeFollow,
	toggleFollowingInProgress,
	setCurrentPage,
	resetPage
})(SearchParams)
