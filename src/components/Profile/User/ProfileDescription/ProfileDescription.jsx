import React from 'react';
import { NavLink } from 'react-router-dom';

import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileContact from './ProfileContact/ProfileContact';

import editSVG from '../../../../assets/img/pencil.png';
import s from './ProfileDescription.module.scss';

const ProfileDescription = props => {
	return (
		<div className={s.about}>
			<div className={s.topPart}>
				<h2>{props.fullName}</h2>
				<ProfileStatus owner={props.owner} status={props.status} updateStatus={props.updateStatus} />
				<p>
					About Me: <span>{props.aboutMe ? props.aboutMe : 'nothing found'}</span>
				</p>
				<h3>
					Looking for a job: <span>{props.lookingForAJob ? props.lookingForAJobDescription : 'have a job'}</span>
				</h3>
			</div>
			<div className={s.bottomPart}>
				{Object.keys(props.contacts).map(key => {
					if (props.contacts[key]) return <ProfileContact key={key} title={key} link={props.contacts[key]} />;
				})}
			</div>

			{props.owner && (
				<NavLink title='edit' className={s.editMode} to='/settings/profile'>
					<img src={editSVG} alt='edit' />
				</NavLink>
			)}
		</div>
	);
};

export default ProfileDescription;
