import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import s from './ProfileSettings.module.scss';
import errorStyle from '../../common/styles/errors.module.scss';

const ProfileSettings = props => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			// i also check for undefined or null and replace it to empty string
			fullName: !props.profile.fullName ? '' : props.profile.fullName,
			aboutMe: !props.profile.aboutMe ? '' : props.profile.aboutMe,
			status: !props.status ? '' : props.status,
			isLookingForAJob: !props.profile.lookingForAJob ? false : props.profile.lookingForAJob,
			skills: !props.profile.lookingForAJobDescription ? '' : props.profile.lookingForAJobDescription,
		},
	});

	const onSubmit = data => {
		console.log(data);
		props.saveProfile({
			fullName: data.fullName,
			aboutMe: data.aboutMe,
			lookingForAJob: data.isLookingForAJob,
			lookingForAJobDescription: data.skills,
		});
	};

	return (
		<section className={s.section}>
			<h1 className={s.title}>Profile Settings</h1>
			<form className={`${s.form}`} onSubmit={handleSubmit(onSubmit)}>
				{/* immutable block with id  */}
				<div className={s.formBlock}>
					id: <span>{props.profile.userId}</span>
				</div>
				{/* fullName */}
				<div className={s.formBlock}>
					Full name
					<input
						{...register('fullName', {
							required: 'full name field is required!',
							maxLength: {
								value: 30,
								message: 'job description field max length is 30',
							},
						})}
						type='text'
						placeholder='Full name'
					/>
					<div className={`${errorStyle.error} ${errors.fullName && errorStyle.showTop}`}>
						<span>{errors.fullName && errors.fullName.message}</span>
					</div>
				</div>
				{/* aboutMe */}
				<div className={s.formBlock}>
					About me
					<input
						{...register('aboutMe', {
							maxLength: {
								value: 300,
								message: 'job description field max length is 300',
							},
						})}
						type='text'
						placeholder='About me'
					/>
					<div className={`${errorStyle.error} ${errors.aboutMe && errorStyle.showTop}`}>
						<span>{errors.aboutMe && errors.aboutMe.message}</span>
					</div>
				</div>
				{/* status */}
				<div className={s.formBlock}>
					Status
					<input
						{...register('status', {
							maxLength: {
								value: 300,
								message: 'job description field max length is 300',
							},
						})}
						type='text'
						placeholder='Status'
					/>
					<div className={`${errorStyle.error} ${errors.status && errorStyle.showTop}`}>
						<span>{errors.status && errors.status.message}</span>
					</div>
				</div>
				{/* lookingForAJob */}
				<div className={s.formBlock}>
					<label>
						<input
							{...register('isLookingForAJob')}
							className={s.checkbox}
							name='isLookingForAJob'
							type='checkbox'
							style={{ marginRight: '1rem' }}
						/>
						Looking for a job
					</label>
				</div>
				{/* job description */}
				<div className={s.formBlock}>
					<label>
						Skills
						<input
							{...register('skills', {
								maxLength: {
									value: 50,
									message: 'job description field max length is 50',
								},
							})}
							type='text'
							placeholder='Your skills'
						/>
					</label>
					<div className={`${errorStyle.error} ${errors.skills && errorStyle.showTop}`}>
						<span>{errors.skills && errors.skills.message}</span>
					</div>
				</div>
				{/* contacts */}
				{/* status
				<div className={s.formBlock}>
					<h1>Contacts</h1>
				</div>
				<div className={s.formBlock}>
					status
					<input
						{...register('status', {
							required: 'status field is required!',
							maxLength: {
								value: 300,
								message: 'job description field max length is 300',
							},
						})}
						type='text'
						placeholder='Status'
					/>
					<div className={`${errorStyle.error} ${errors.status && errorStyle.showTop}`}>
						<span>{errors.status && errors.status.message}</span>
					</div>
				</div> */}
				{/* {props.isFormWrong && (
					<div className={errorStyle.formError}>
						{props.messages.map((text, index) => (
							<p key={index}>{text}</p>
						))}
					</div>
				)} */}
				<div className={`${s.formBlock} ${s.blockBtns}`}>
					<button className={s.button} type='submit'>
						Save
					</button>
				</div>
			</form>
		</section>
	);
};

export default ProfileSettings;
