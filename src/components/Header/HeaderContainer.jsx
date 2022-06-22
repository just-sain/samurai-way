import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../redux/authReducer';
import Header from './Header';


const mapStateToProps = state => ({
	data: state.auth.data,
	profile: state.auth.profile,
	isAuth: state.auth.isAuth
});

// second container component
class HeaderContainer extends Component {
	render() {
		return (
			<Header {...this.props} />
		);
	}
}

export default connect(mapStateToProps, { logout })(HeaderContainer);