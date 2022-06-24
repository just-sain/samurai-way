import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getFullProfile, savePhoto, updateStatus } from '../../../redux/profileReducer';

import withAuthNavigate from '../../../hoc/withAuthNavigate';
import ProfileSettings from './ProfileSettings';

class ProfileSettingsContainer extends React.PureComponent {
	componentDidMount = () => {
		if (this.props.id && !isNaN(this.props.id)) {
			if (this.props.profile?.userId !== parseInt(this.props.id)) {
				this.props.getFullProfile(this.props.id);
			}
		}
	};

	render = () => {
		return (
			<ProfileSettings
				id={this.props.id}
				profile={this.props.profile}
				savePhoto={this.props.savePhoto}
				getStatus={this.props.getStatus}
				updateStatus={this.props.updateStatus}
			/>
		);
	};
}

const mapState = state => ({
	id: Number(state.auth.data.id),
	profile: state.profilePage.profile,
	status: state.profilePage.status,
});

export default compose(
	connect(mapState, { getFullProfile, savePhoto, updateStatus }),
	withAuthNavigate
)(ProfileSettingsContainer);
