import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { compose } from 'redux';

import { getStatus, updateStatus, getProfile, setUserProfile, resetPage } from '../../redux/profileReducer';
import Profile from './Profile';

// props
const mapStateToProps = state => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	posts: state.profilePage.posts,
	selfID: state.auth.data.id,
	isAuth: state.auth.isAuth,
});

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
const withRouter = Component => {
	return props => {
		const navigate = useNavigate();
		const { id } = useParams();

		// checking is user authorized
		useEffect(() => {
			if (!props.isAuth || !props.selfID || isNaN(props.selfID)) {
				navigate('/login');
			}
			// if id from params is not correct
			if (!id || isNaN(id)) {
				navigate('/not-found');
			}
		}, [id]);

		return <Component {...props} id={id} />;
	};
};

// second container component
class ProfileContainer extends React.PureComponent {
	componentDidMount = () => {
		if (this.props.id && !isNaN(this.props.id)) {
			this.props.getProfile(this.props.id);
			this.props.getStatus(this.props.id);
		}
	};

	componentWillUnmount = () => {
		this.props.resetPage();
	};

	componentDidUpdate = () => {
		if (!isNaN(this.props.profile?.userId) && this.props.profile?.userId !== parseInt(this.props.id)) {
			this.props.getProfile(this.props.id);
			this.props.getStatus(this.props.id);
		}
	};

	render = () => {
		return (
			<Profile
				{...this.props}
				profile={this.props.profile}
				getStatus={this.props.getStatus}
				updateStatus={this.props.updateStatus}
				posts={this.props.posts}
			/>
		);
	};
}

// from right to left
export default compose(
	connect(mapStateToProps, {
		getStatus,
		updateStatus,
		getProfile,
		setUserProfile,
		resetPage,
	}),
	withRouter
)(ProfileContainer);
