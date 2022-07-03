import React, { useState, useEffect } from 'react'

import s from './ProfileStatus.module.scss'

type TProps = {
	owner: boolean
	status: null | string
	updateStatus: (status: string) => void
}

const ProfileStatus = (props: TProps) => {
	const [status, setStatus] = useState(props.status || '')
	const [editDescMode, setEditDescMode] = useState(false)

	// for status
	useEffect(() => {
		setStatus(props.status || '')
	}, [props.status])

	const activatedEditMode = () => {
		if (props.owner) {
			setEditDescMode(true)
		}
	}

	const deactivatedEditMode = () => {
		setEditDescMode(false)

		if (status !== props.status) {
			if (status.length <= 300) {
				props.updateStatus(status)
			} else {
				alert('max status length must be below 300!')
			}
		}
	}

	const onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<p className={s.status} onDoubleClick={activatedEditMode}>
			Status:
			{!editDescMode ? (
				<span className={s.statusText}>{props.status || 'no status'}</span>
			) : (
				<input
					className={s.statusInput}
					autoFocus
					type='text'
					value={status}
					onChange={onStatusChange}
					onBlur={deactivatedEditMode}
				/>
			)}
		</p>
	)
}

export default ProfileStatus
