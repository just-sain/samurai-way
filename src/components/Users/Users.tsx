import React, { useEffect, useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// actions thunks
import { actions, requestUsers, changeFollow as changeFollowThunk } from '../../redux/usersReducer'
// selectors
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getDataID } from '../../selectors/auth-selector'
import { getTotalUsersCount, getCurrentPage, getFollowingInProgress, getPageSize, getIsFetching, getUsers } from '../../selectors/users-selector'
// types
import { AppDispatchType } from '../../redux/redux-store'
// components
import Preloader from '../common/Preloader/Preloader'
import User from './User/User'
import Search from './Search/Search'
import Pagination from '../common/Pagination/Pagination'
// styles
import s from './Users.module.scss'
import { TUsersSearchParams } from '../../types/users-types'

const Users = () => {
	// search params
	const [searchParams, setSearchParams] = useSearchParams()
	const searchPage = searchParams.get('page')
	const searchTerm = searchParams.get('term') || ''
	const searchFriend = searchParams.get('friend') || ''

	let resultFriend: null | boolean = null
	if (searchFriend === 'true') resultFriend = true
	else if (searchFriend === 'false') resultFriend = false
	else resultFriend = null

	// selectors
	const selfID = useTypedSelector(getDataID) as number,
		totalUsersCount = useTypedSelector(getTotalUsersCount),
		currentPage = useTypedSelector(getCurrentPage),
		pageSize = useTypedSelector(getPageSize),
		followingInProgress = useTypedSelector(getFollowingInProgress),
		users = useTypedSelector(getUsers),
		isFetching = useTypedSelector(getIsFetching)

	// dispatches
	const dispatch = useDispatch<AppDispatchType>()

	const toggleFollowingInProgress = (isFetching: boolean, userID: number) => {
		dispatch(actions.toggleFollowingInProgress(isFetching, userID))
	}
	const changeFollow = (doFollow: boolean, userID: number) => {
		dispatch(changeFollowThunk(doFollow, userID))
	}

	// component did mount
	useLayoutEffect(() => {
		let page: number = currentPage
		if (page !== (searchPage !== null ? searchPage : page)) {
			dispatch(actions.setCurrentPage(Number(searchPage)))
			page = Number(searchPage)
		}

		const resParams: TUsersSearchParams = {
			page: String(page)
		}
		if (searchTerm !== '') resParams.term = searchTerm
		if (resultFriend !== null) resParams.friend = String(resultFriend)

		setSearchParams(resParams)
		dispatch(requestUsers(currentPage, pageSize, true, searchTerm, resultFriend))
	}, [])

	// functions
	const onChangePage = (page: number) => {
		dispatch(actions.setCurrentPage(page))

		const resParams: TUsersSearchParams = {
			page: String(page)
		}
		if (searchTerm !== '') resParams.term = searchTerm
		if (resultFriend !== null) resParams.friend = String(resultFriend)

		setSearchParams(resParams)
		dispatch(requestUsers(page, pageSize, false, searchTerm, resultFriend))
	}

	const onSearchUsers = (search: string, friend: null | boolean) => {
		const resParams: TUsersSearchParams = {
			page: '1'
		}
		if (searchTerm !== '') resParams.term = searchTerm
		if (resultFriend !== null) resParams.friend = String(resultFriend)

		dispatch(actions.setCurrentPage(1))
		setSearchParams(resParams)
		dispatch(requestUsers(1, pageSize, true, search, friend))
	}

	// block
	const usersBlock = users.map((user: any) => (
		<User
			key={user.id}
			selfID={selfID}
			userID={user.id}
			smallPhoto={user.photos.small}
			name={user.name}
			followed={user.followed}
			status={user.status}
			followingInProgress={followingInProgress}
			changeFollow={changeFollow}
			toggleFollowingInProgress={toggleFollowingInProgress}
		/>
	))

	// render
	if (isFetching) return <Preloader />
	return (
		<section className={s.users}>
			<Search onSearchUsers={onSearchUsers} setSearchParams={setSearchParams} searchFriend={searchFriend} searchTerm={searchTerm} />
			<div className={s.nav}>
				<Pagination onChangePage={onChangePage} totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} />
			</div>
			<div>{usersBlock}</div>
		</section>
	)
}

export default Users
