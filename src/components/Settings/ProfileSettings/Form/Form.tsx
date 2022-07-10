import React, { memo, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'

// types
import { TContacts, TProfile, TUpdateProfile } from '../../../../types/types'
// styles
import s from './Form.module.scss'
import errorStyle from '../../../../assets/styles/errors.module.scss'
import undefinedPhoto from '../../../../assets/img/blank-profile-picture.webp'

type TFormValues = {
	fullName: string
	aboutMe: string
	isLookingForAJob: boolean
	skills: string
	contacts: TContacts
	status: string
	photo: File
}
type TProps = {
	id: number
	profile: TProfile
	status: string
	messages: Array<string>
	updateStatus: (status: string) => void
	saveProfile: (profileData: TUpdateProfile) => void
	savePhoto: (photo: File) => void
}

const Form = (props: TProps) => {
	const defaultValues = {
		fullName: !props.profile.fullName ? '' : props.profile.fullName,
		aboutMe: !props.profile.aboutMe ? '' : props.profile.aboutMe,
		status: !props.status ? '' : props.status,
		isLookingForAJob: !props.profile.lookingForAJob ? false : props.profile.lookingForAJob,
		skills: !props.profile.lookingForAJobDescription ? '' : props.profile.lookingForAJobDescription,
		contacts: { ...props.profile.contacts }
	}
	const {
		handleSubmit,
		register,
		control,
		reset,
		getValues,
		formState: { errors }
	} = useForm<TFormValues>({
		mode: 'onBlur',
		defaultValues: useMemo(() => defaultValues, [props.profile, props.status])
	})
	const { isDirty } = useFormState({ control })

	const onSubmit: SubmitHandler<TFormValues> = data => {
		props.saveProfile({
			fullName: data.fullName,
			aboutMe: data.aboutMe,
			lookingForAJob: data.isLookingForAJob,
			lookingForAJobDescription: data.skills,
			contacts: { ...props.profile.contacts }
		})
		props.updateStatus(data.status)
	}

	useEffect(() => {
		reset(getValues())
	}, [props.profile, props.status])

	const capitalizeLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	return (
		<form className={`${s.form}`} onSubmit={handleSubmit(onSubmit)}>
			<div className={`${s.formSection} ${s._avatar}`}>
				{/* avatar */}
				<div className={s.formBlock}>
					Avatar
					<img src={!props.profile.photos?.large ? undefinedPhoto : props.profile.photos.large} alt='' />
					<div className={s.formBlock}>
						Choose photo <input {...register('photo')} type='file' accept='image/jpeg, image/png' />
					</div>
				</div>
				{/* immutable block with id  */}
				<div className={s.formBlock}>
					{'id: '}
					<span>
						{props.profile.userId}
						<i> (immutable)</i>
					</span>
				</div>
			</div>
			<div className={`${s.formSection} ${s._desc}`}>
				{/* fullName */}
				<div className={s.formBlock}>
					Full name
					<input
						{...register('fullName', {
							required: 'full name field is required!',
							maxLength: {
								value: 50,
								message: 'job description field max length is 50'
							}
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
								value: 1000,
								message: 'job description field max length is 1000'
							}
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
								message: 'job description field max length is 300'
							}
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
				{/* job description/skills */}
				<div className={s.formBlock}>
					<label>
						Skills
						<input
							{...register('skills', {
								maxLength: {
									value: 300,
									message: 'job description field max length is 300'
								}
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
				{Object.keys(props.profile.contacts).map(key => (
					<div className={s.formBlock} key={key}>
						<label>
							<span style={{ textTransform: 'capitalize' }}>{key === 'mainLink' ? 'Main' : capitalizeLetter(key)}</span>
							<input
								{...register(`contacts.${key}`)}
								type='text'
								placeholder={`${key === 'mainLink' ? 'Main' : capitalizeLetter(key)} link`}
							/>
						</label>
					</div>
				))}

				{
					// form errors
					props.messages.length !== 0 && (
						<div className={errorStyle.formError}>
							{props.messages.map((text, index) => (
								<p key={index}>{text}</p>
							))}
						</div>
					)
				}

				{/* button */}
				<div className={`${s.formBlock} ${s.blockBtns}`}>
					{isDirty ? (
						<button className={s.button} type='submit'>
							Save
						</button>
					) : (
						<button className={s.button} disabled type='submit'>
							Save
						</button>
					)}
				</div>
			</div>
		</form>
	)
}

export default memo(Form)
