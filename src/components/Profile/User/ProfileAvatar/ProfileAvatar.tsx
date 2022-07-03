import React, { useState } from 'react'

import editSVG from '../../../../assets/img/pencil.png'
import haveNotImage from '../../../../assets/img/blank-profile-picture.webp'

import { TPhotos } from '../../../../types/types'
import s from './ProfileAvatar.module.scss'

type TProps = {
	profilePhotos: TPhotos
	owner: boolean
	savePhoto: (photo: File) => void
}

const ProfileAvatar = (props: TProps) => {
	const [editAvatar, setEditAvatar] = useState(false)
	const [photo, setPhoto] = useState<File>()
	const [isError, setIsError] = useState(false)

	const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files
		if (files?.length) {
			setPhoto(files[0])
			setIsError(false)
		} else {
			setIsError(true)
		}
	}

	const onSavePhoto = () => {
		if (photo) {
			props.savePhoto(photo)
			setEditAvatar(false)
		} else {
			setIsError(true)
		}
	}

	return (
		<>
			<div className={s.img}>
				<img
					className={s.avatar}
					src={
						props.profilePhotos?.large || props.profilePhotos?.small
							? props.profilePhotos?.large || props.profilePhotos?.small
							: haveNotImage
					}
				/>
				{props.owner && <img title='edit' className={s.edit} src={editSVG} alt='edit' onClick={() => setEditAvatar(true)} />}
			</div>
			{editAvatar && (
				<div className={s.ModalWindow}>
					<div className={s.block}>
						<img
							className={s.avatar}
							src={
								!photo
									? props.profilePhotos?.large || props.profilePhotos?.small
										? props.profilePhotos?.large || props.profilePhotos?.small
										: haveNotImage
									: photo?.name
							}
							alt='photo'
						/>
					</div>
					<div className={s.block}>
						<input type='file' className={s.file} onChange={onPhotoSelected} />
						{isError && <p className='error'>File not selected</p>}
					</div>
					<div className='block buttons'>
						<button
							className={`${s.btn} ${s.cancel}`}
							onClick={() => {
								setEditAvatar(false)
							}}>
							Cancel
						</button>
						<button className={`${s.btn} ${s.save}`} onClick={onSavePhoto}>
							Save
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default ProfileAvatar
