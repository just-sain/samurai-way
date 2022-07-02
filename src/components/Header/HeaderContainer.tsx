import React, { Component } from 'react'
import { connect } from 'react-redux'
// types
import { AppStateType } from '../../redux/redux-store'

import { logout } from '../../redux/authReducer'
import Header from './Header'
import { getAuth, getProfile, getData } from '../../selectors/auth-selector'
import { dataType, profileType } from '../../types/types'

type OwnPropsType = {}
type MapStatePropsType = {
	data: dataType
	profile: profileType
	isAuth: boolean
}
type MapDispatchPropsType = {
	logout: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

// second container component
class HeaderContainer extends Component<PropsType> {
	render() {
		return <Header {...this.props} />
	}
}

const mapStateToProps = (state: AppStateType) => ({
	data: getData(state),
	profile: getProfile(state),
	isAuth: getAuth(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { logout })(
	HeaderContainer
)
