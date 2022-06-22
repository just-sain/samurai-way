import { createSelector } from 'reselect';

// users
const getUsers = state => state.usersPage.users;
export const getFilteredUsers = createSelector(getUsers, users => {
	if (getUsers.length > 0) return users.filter(user => true);
	return getUsers;
});

export const getPageSize = state => state.usersPage.pageSize;
export const getTotalUsersCount = state => state.usersPage.totalUsersCount;
export const getCurrentPage = state => state.usersPage.currentPage;
export const getIsFetching = state => state.usersPage.isFetching;
export const getFollowingInProgress = state => state.usersPage.followingInProgress;
