import React from 'react';

import ProfileDescription from './ProfileDescription/ProfileDescription';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';

import s from './User.module.scss';

const User = props => {
	return (
		<div className={s.user}>
			<ProfileAvatar owner={props.owner} savePhoto={props.savePhoto} profilePhotos={props.profile.photos} />
			<ProfileDescription
				owner={props.owner}
				fullName={props.profile.fullName}
				aboutMe={props.profile.aboutMe}
				lookingForAJob={props.profile.lookingForAJob}
				lookingForAJobDescription={props.profile.lookingForAJobDescription}
				status={props.status}
				contacts={props.profile.contacts}
				updateStatus={props.updateStatus}
			/>
		</div>
	);
};

export default User;
