import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { login, resetLoginPage } from '../../redux/authReducer';
import Login from './Login';

// short name mapState, full name -mapStateToProps
const mapState = state => ({
	isAuth: state.auth.isAuth,
	userID: state.auth.data.id,
	isFormWrong: state.auth.isFormWrong,
	messages: state.auth.messages,
});

// second class container component
class LoginContainer extends Component {
	componentWillUnmount = () => {
		resetLoginPage();
	};

	render() {
		if (this.props.isAuth) {
			return <Navigate to={`/profile/${this.props.userID}`} />;
		}

		return <Login isFormWrong={this.props.isFormWrong} messages={this.props.messages} login={this.props.login} />;
	}
}

export default connect(mapState, { login, resetLoginPage })(LoginContainer);
