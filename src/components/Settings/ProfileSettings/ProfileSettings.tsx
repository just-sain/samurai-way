import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
// actions and thunks
import { getFullProfileThunk, savePhotoThunk, updateStatusThunk, saveProfileThunk } from '../../../redux/profileReducer'
// selectors
import { getErrorMessages, getProfile, getStatus } from '../../../selectors/profile-selector'
import { getAuth, getDataID } from '../../../selectors/auth-selector'
// types
import { TUpdateProfile } from '../../../types/types'
import { AppDispatchType } from '../../../redux/redux-store'
// components
import Preloader from '../../common/Preloader/Preloader'
import Form from './Form/Form'
// styles
import s from './ProfileSettings.module.scss'
import withAuthNavigate from '../../../hoc/withAuthNavigate'

const ProfileSettings = () => {
	// selectors
	const id = useTypedSelector(getDataID) as number,
		profile = useTypedSelector(getProfile),
		status = useTypedSelector(getStatus),
		messages = useTypedSelector(getErrorMessages)

	// dispatch
	const dispatch = useDispatch<AppDispatchType>(),
		updateStatus = (status: string) => dispatch(updateStatusThunk(status)),
		saveProfile = (profileData: TUpdateProfile) => dispatch(saveProfileThunk(profileData)),
		savePhoto = (photo: File) => dispatch(savePhotoThunk(photo))

	// component did mount
	useEffect(() => {
		if (profile?.userId !== id) {
			dispatch(getFullProfileThunk(id))
		}
	}, [])

	// return
	if (!profile || !status) return <Preloader />
	return (
		<section className={s.section}>
			<h1 className={s.title}>Profile Settings</h1>
			<Form
				id={id}
				profile={profile}
				status={status}
				messages={messages}
				updateStatus={updateStatus}
				savePhoto={savePhoto}
				saveProfile={saveProfile}
			/>
		</section>
	)
}

export default memo(withAuthNavigate(ProfileSettings))
