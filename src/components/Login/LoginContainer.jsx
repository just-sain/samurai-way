import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { login } from '../../redux/authReducer';
import Login from './Login';

// short name mapState, full name -mapStateToProps
const mapState = state => ({
	isAuth: state.auth.isAuth,
	userID: state.auth.data.id,
	messages: state.errors.loginErrors.messages,
	captchaURL: state.errors.loginErrors.captchaURL,
});

// second class container component
class LoginContainer extends Component {
	render() {
		if (this.props.isAuth) {
			return <Navigate to={`/profile/${this.props.userID}`} />;
		}

		return <Login captchaURL={this.props.captchaURL} messages={this.props.messages} login={this.props.login} />;
	}
}

export default connect(mapState, { login })(LoginContainer);
