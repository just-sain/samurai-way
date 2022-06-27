import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getFullProfile, savePhoto, updateStatus, saveProfile } from '../../../redux/profileReducer';

import withAuthNavigate from '../../../hoc/withAuthNavigate';
import Preloader from '../../common/Preloader/Preloader';
import ProfileSettings from './ProfileSettings';

class ProfileSettingsContainer extends React.PureComponent {
	componentDidMount = () => {
		if (this.props.profile?.userId !== parseInt(this.props.id)) {
			this.props.getFullProfile(this.props.id);
		}
	};

	render = () => {
		if (!this.props.profile || !this.props.status) return <Preloader />;
		return (
			<ProfileSettings
				id={this.props.id}
				profile={this.props.profile}
				savePhoto={this.props.savePhoto}
				status={this.props.status}
				messages={this.props.messages}
				updateStatus={this.props.updateStatus}
				saveProfile={this.props.saveProfile}
			/>
		);
	};
}

const mapState = state => ({
	id: Number(state.auth.data.id),
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	messages: state.errors.profileErrors.messages,
});

export default compose(
	connect(mapState, { getFullProfile, savePhoto, updateStatus, saveProfile }),
	withAuthNavigate
)(ProfileSettingsContainer);
