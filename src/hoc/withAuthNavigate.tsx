import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
// types
import { AppStateType } from '../redux/redux-store'
// selector
import { getAuth } from '../selectors/auth-selector'

type MapStatePropsType = {
	isAuth: boolean
}
type MapDispatchToProps = {}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchToProps & OwnPropsType

const withAuthNavigate = (Component: any) => {
	class NavigateComponent extends React.Component<PropsType> {
		render() {
			if (!this.props.isAuth) return <Navigate to='/login' />
			return <Component {...this.props} />
		}
	}

	return connect<MapStatePropsType, MapDispatchToProps, OwnPropsType, AppStateType>(mapStateToPropsForNavigate)(NavigateComponent)
}

const mapStateToPropsForNavigate = (state: AppStateType) => ({
	isAuth: getAuth(state)
})

export default withAuthNavigate
