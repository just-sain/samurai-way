import React, { lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import store from './redux/redux-store';
// action creators from reducers
import { initializeApp } from './redux/appReducer';
// hoc
import withSuspense from './hoc/withSuspense';
// components for default page
import HeaderContainer from './components/Header/HeaderContainer';
import AsideContainer from './components/Aside/AsideContainer';
// common components
import Preloader from './components/common/Preloader/Preloader';
// errors page
import Error404 from './components/errors/Error404/Error404';
// styles
import s from './App.module.scss';
// suspense and loaded lazy components (components to routes)
const LoginContainer = withSuspense(lazy(() => import('./components/Login/LoginContainer')));
const ProfileContainer = withSuspense(lazy(() => import('./components/Profile/ProfileContainer')));
const News = withSuspense(lazy(() => import('./components/News/News')));
const Music = withSuspense(lazy(() => import('./components/Music/Music')));
const Settings = withSuspense(lazy(() => import('./components/Settings/Settings')));
const DialogsContainer = withSuspense(lazy(() => import('./components/Dialogs/DialogsContainer')));
const UsersContainer = withSuspense(lazy(() => import('./components/Users/UsersContainer')));

const mapState = state => ({
	initialized: state.app.initialized,
});

class App extends React.Component {
	componentDidMount = () => {
		this.props.initializeApp();
	};

	render = () => {
		if (!this.props.initialized) {
			return <Preloader />;
		}

		return (
			<div className={s.App}>
				<HeaderContainer />
				<AsideContainer />
				<main className={s.main}>
					<Routes>
						<Route path='/' element={<News />} />
						<Route path='/login' element={<LoginContainer />} />
						<Route path='/profile/:id' element={<ProfileContainer />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='*' element={<Error404 />} />
					</Routes>
				</main>
			</div>
		);
	};
}

const AppContainer = connect(mapState, { initializeApp })(App);

const AppWithProvider = () => (
	<HashRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</HashRouter>
);

export default AppWithProvider;
