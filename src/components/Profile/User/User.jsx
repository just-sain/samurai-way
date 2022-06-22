import React from 'react';

import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';

import haveNotImage from '../../../assets/img/blank-profile-picture.webp';
import s from './User.module.scss';

const User = props => {
	return (
		<div className={s.user}>
			<img
				src={
					props.profile.photos.large || props.profile.photos.small
						? props.profile.photos.large || props.profile.photos.small
						: haveNotImage
				}
				alt=''
				className={s.img}
			/>
			<ProfileStatusWithHooks
				owner={props.owner}
				fullName={props.profile.fullName}
				aboutMe={props.profile.aboutMe}
				lookingForAJob={props.profile.lookingForAJob}
				lookingForAJobDescription={props.profile.lookingForAJobDescription}
				status={props.status}
				updateStatus={props.updateStatus}
			/>
		</div>
	);
};

export default User;
