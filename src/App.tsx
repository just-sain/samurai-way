import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { connect, MapDispatchToProps, Provider } from 'react-redux'
import store, { AppStateType } from './redux/redux-store'
// action creators from reducers
import { initializeApp } from './redux/appReducer'
// hoc
import withSuspense from './hoc/withSuspense'
// components for default page
import HeaderContainer from './components/Header/HeaderContainer'
import AsideContainer from './components/Aside/AsideContainer'
// common components
import Preloader from './components/common/Preloader/Preloader'
// errors page
import Error404 from './components/errors/Error404/Error404'
// styles
import './App.scss'
// suspense and loaded lazy components (components to routes)
const LoginContainer = withSuspense(lazy(() => import('./components/Login/LoginContainer')))
const ProfileContainer = withSuspense(lazy(() => import('./components/Profile/ProfileContainer')))
const News = withSuspense(lazy(() => import('./components/News/News')))
const Music = withSuspense(lazy(() => import('./components/Music/Music')))
const Settings = withSuspense(lazy(() => import('./components/Settings/Settings')))
const ProfileSettingsContainer = withSuspense(
	lazy(() => import('./components/Settings/ProfileSettings/ProfileSettingsContainer'))
)
const DialogsContainer = withSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')))
const UsersContainer = withSuspense(lazy(() => import('./components/Users/UsersContainer')))

type MapStatePropsType = {
	initialized: boolean
}
type MapDispatchPropsType = {
	initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class App extends React.Component<PropsType> {
	componentDidMount = () => {
		this.props.initializeApp()
	}

	render = () => {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<div className='App'>
				<HeaderContainer />
				<AsideContainer />
				<main className='main'>
					<Routes>
						<Route path='/' element={<News />} />
						<Route path='/login' element={<LoginContainer />} />
						<Route path='/profile/:id' element={<ProfileContainer />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings/profile' element={<ProfileSettingsContainer />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='*' element={<Error404 />} />
					</Routes>
				</main>
			</div>
		)
	}
}

const mapState = (state: any) => ({
	initialized: state.app.initialized
})

const AppContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapState, { initializeApp })(
	App
)

const AppWithProvider = () => (
	<BrowserRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>
)

export default AppWithProvider
