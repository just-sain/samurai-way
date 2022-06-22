import React, { useState, useEffect } from 'react';

import s from './ProfileStatus.module.scss';

const ProfileStatusWithHooks = props => {
	const [status, setStatus] = useState(props.status || '');
	const [editDescMode, setEditDescMode] = useState(false);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activatedEditMode = () => {
		setEditDescMode(true);
	};

	const deactivatedEditMode = () => {
		setEditDescMode(false);

		if (status !== props.status) {
			if (status.length <= 300) {
				props.updateStatus(status);
			} else {
				alert('max status length must be below 300!');
			}
		}
	};

	const onStatusChange = e => {
		setStatus(e.currentTarget.value);
	};

	return (
		<div className={s.about}>
			<h2>{props.fullName}</h2>
			<p className={s.description} onDoubleClick={activatedEditMode}>
				Status:
				{!editDescMode ? (
					<span className={s.descriptionText}>{props.status || '/ no status'}</span>
				) : (
					<input
						className={s.descriptionInput}
						autoFocus
						type='text'
						value={status}
						onChange={onStatusChange}
						onBlur={deactivatedEditMode}
					/>
				)}
			</p>
			{/* <p>About Me: { props.aboutMe ? props.aboutMe : "nothing found" }</p> */}
			<h3>
				Looking for a job:{' '}
				<span>{props.lookingForAJob ? props.lookingForAJobDescription : 'have a job'}</span>
			</h3>
		</div>
	);
};

export default ProfileStatusWithHooks;
