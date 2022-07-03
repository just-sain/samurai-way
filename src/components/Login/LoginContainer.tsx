import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { login } from '../../redux/authReducer'
import { AppStateType } from '../../redux/redux-store'
import Login from './Login'

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

// second class container component
class LoginContainer extends PureComponent<PropsType> {
	render() {
		if (this.props.isAuth) {
			return <Navigate to={`/profile/${this.props.userID}`} />
		}

		return <Login captchaURL={this.props.captchaURL} messages={this.props.messages} login={this.props.login} />
	}
}

type MapStatePropsType = {
	isAuth: boolean
	userID: null | number
	messages: Array<string>
	captchaURL: null | string
}
type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha?: null | string) => void
}
type OwnPropsType = {}

// short name mapState, full name -mapStateToProps
const mapState = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	userID: state.auth.data.id,
	messages: state.errors.loginErrors.messages,
	captchaURL: state.errors.loginErrors.captchaURL
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapState, { login })(LoginContainer)
