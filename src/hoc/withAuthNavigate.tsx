import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
// types
import { AppStateType } from '../redux/redux-store'
// selector
import { getAuth } from '../selectors/auth-selector'

type TMapState = {
	isAuth: boolean
}
const MapState = (state: AppStateType) => ({
	isAuth: getAuth(state)
})

const withAuthNavigate = (Component: any) => {
	class NavigateComponent extends React.Component<TMapState> {
		render() {
			const { isAuth, ...restProps } = this.props
			if (!this.props.isAuth) return <Navigate to='/login' />
			return <Component {...restProps} />
		}
	}

	return connect<TMapState, {}, {}, AppStateType>(MapState)(NavigateComponent)
}

export default withAuthNavigate
