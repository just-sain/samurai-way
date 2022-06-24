import React from 'react';
import { useForm } from 'react-hook-form';

import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileSettings.module.scss';

const ProfileSettings = props => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	if (!props?.profile) return <Preloader />;
	return (
		<section className={s.section}>
			<h1 className={s.title}>Profile Settings</h1>
			<div className={s.content}></div>
		</section>
	);
};

export default ProfileSettings;
