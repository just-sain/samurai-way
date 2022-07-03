import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { getFullProfile, savePhoto, updateStatus, saveProfile } from '../../../redux/profileReducer'

import withAuthNavigate from '../../../hoc/withAuthNavigate'
import Preloader from '../../common/Preloader/Preloader'
import ProfileSettings from './ProfileSettings'
import { AppStateType } from '../../../redux/redux-store'
import { TProfile, TUpdateProfile } from '../../../types/types'

type TProps = TMapState & TMapDispatch

class ProfileSettingsContainer extends React.PureComponent<TProps> {
	componentDidMount = () => {
		if (this.props.profile?.userId !== this.props.id) {
			this.props.getFullProfile(this.props.id)
		}
	}

	render = () => {
		if (!this.props.profile || !this.props.status) return <Preloader />
		return (
			<ProfileSettings
				id={this.props.id}
				profile={this.props.profile as TProfile}
				savePhoto={this.props.savePhoto}
				status={this.props.status as string}
				messages={this.props.messages}
				updateStatus={this.props.updateStatus}
				saveProfile={this.props.saveProfile}
			/>
		)
	}
}

type TMapState = {
	id: number
	profile: null | TProfile
	status: null | string
	messages: Array<string>
}
const mapState = (state: AppStateType) => ({
	id: Number(state.auth.data.id),
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	messages: state.errors.profileErrors.messages
})
type TMapDispatch = {
	getFullProfile: (id: number) => void
	savePhoto: (photo: File) => void
	updateStatus: (status: string) => void
	saveProfile: (profileData: TUpdateProfile) => void
}

export default compose(
	connect<TMapState, TMapDispatch, {}, AppStateType>(mapState, { getFullProfile, savePhoto, updateStatus, saveProfile }),
	withAuthNavigate
)(ProfileSettingsContainer)
