import usersReducer, { actions, initialStateType } from './usersReducer'

// remember test is compose by 3 step
// 1 step: initial state
let state: initialStateType = {
	users: [
		{
			followed: true,
			id: 12,
			name: 'asdf',
			photos: {
				large: '',
				small: ''
			},
			status: 'Hi I am asdf'
		},
		{
			followed: true,
			id: 123,
			name: 'just.sain',
			photos: {
				large: '',
				small: ''
			},
			status: 'Hi I am asdf'
		},
		{
			followed: false,
			id: 6,
			name: 'HH',
			photos: {
				large: '',
				small: ''
			},
			status: 'Hi I am HH'
		},
		{
			followed: false,
			id: 0,
			name: 'sain',
			photos: {
				large: '',
				small: ''
			},
			status: 'Hi I am asdf'
		}
	],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	followingInProgress: [], // array of users id
	isFetching: false
}

beforeEach(() => {
	state = {
		users: [
			{
				followed: true,
				id: 12,
				name: 'asdf',
				photos: {
					large: '',
					small: ''
				},
				status: 'Hi I am asdf'
			},
			{
				followed: true,
				id: 123,
				name: 'just.sain',
				photos: {
					large: '',
					small: ''
				},
				status: 'Hi I am asdf'
			},
			{
				followed: false,
				id: 6,
				name: 'HH',
				photos: {
					large: '',
					small: ''
				},
				status: 'Hi I am HH'
			},
			{
				followed: false,
				id: 0,
				name: 'sain',
				photos: {
					large: '',
					small: ''
				},
				status: 'Hi I am asdf'
			}
		],
		pageSize: 12,
		totalUsersCount: 0,
		currentPage: 1,
		followingInProgress: [], // array of users id
		isFetching: false
	}
})

test('follow success', () => {
	// 2 step: reducer
	const newState = usersReducer(state, actions.toggleFollow(0))

	// 3 step: expect
	expect(newState.users[0].followed).toBeTruthy()
	expect(newState.users[newState.users.length - 1].followed).toBeTruthy()
})

test('unfollow success', () => {
	// 2 step: reducer
	const newState = usersReducer(state, actions.toggleFollow(12))

	// 3 step: expect
	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[newState.users.length - 1].followed).toBeFalsy()
})
