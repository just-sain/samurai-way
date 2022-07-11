import React, { lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, AppStateType } from './redux/redux-store'
// action creators from reducers
import { initializeAppThunk } from './redux/appReducer'
// hoc
import withSuspense from './hoc/withSuspense'
// components for default page
import Header from './components/Header/Header'
import AsideContainer from './components/Aside/Aside'
// common components
import Preloader from './components/common/Preloader/Preloader'
// errors page
import Error404 from './components/errors/Error404/Error404'
import { getInitialized } from './selectors/app'
// suspense and loaded lazy components (components to routes)
const Login = withSuspense(lazy(() => import('./components/Login/Login')))
const Profile = withSuspense(lazy(() => import('./components/Profile/Profile')))
const News = withSuspense(lazy(() => import('./components/News/News')))
const Music = withSuspense(lazy(() => import('./components/Music/Music')))
const Settings = withSuspense(lazy(() => import('./components/Settings/Settings')))
const ProfileSettings = withSuspense(lazy(() => import('./components/Settings/ProfileSettings/ProfileSettings')))
const Dialogs = withSuspense(lazy(() => import('./components/Dialogs/Dialogs')))
const Users = withSuspense(lazy(() => import('./components/Users/Users')))
// pages
const ChatPage = withSuspense(lazy(() => import('./pages/ChatPage')))

const App = () => {
	const initialized = useSelector(getInitialized)

	const dispatch: AppDispatchType = useDispatch()

	useEffect(() => {
		dispatch(initializeAppThunk())
	}, [])

	// render
	if (!initialized) {
		return <Preloader />
	}
	return (
		<div className='App'>
			<Header />
			<AsideContainer />
			<main className='main'>
				<Routes>
					<Route path='/' element={<News />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/dialogs/*' element={<Dialogs />} />
					<Route path='/users' element={<Users />} />
					<Route path='/music' element={<Music />} />
					<Route path='/settings/profile' element={<ProfileSettings />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='*' element={<Error404 />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
