import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { compose } from 'redux';

import { getStatus, updateStatus, getProfile, resetPage, getFullProfile } from '../../redux/profileReducer';
import Profile from './Profile';

// props
const mapStateToProps = state => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	posts: state.profilePage.posts,
	selfID: Number(state.auth.data.id),
	isAuth: state.auth.isAuth,
});

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
const withRouter = Component => {
	return props => {
		const navigate = useNavigate();
		let { id } = useParams();

		id = Number(id);

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

		return <Component {...props} owner={props.selfID === id} id={id} />;
	};
};

// second container component
class ProfileContainer extends React.PureComponent {
	refreshProfile = () => {
		// i check existing id for... aa... just in case)
		if (this.props.id && !isNaN(this.props.id)) {
			if (this.props.profile?.userId !== parseInt(this.props.id)) {
				this.props.getFullProfile(this.props.id);
			}
		}
	};

	componentDidMount = () => {
		this.refreshProfile();
	};

	componentWillUnmount = () => {
		this.props.resetPage();
	};

	componentDidUpdate = prevProps => {
		if (this.props.id !== prevProps.id) this.refreshProfile();
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
		resetPage,
		getFullProfile,
	}),
	withRouter
)(ProfileContainer);
