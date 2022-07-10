import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { usePrevious } from '../../hooks/usePrevious'
//components
import Preloader from '../common/Preloader/Preloader'
import Error404 from '../errors/Error404/Error404'
import Posts from './Posts/Posts'
import User from './User/User'
// selectors
import { getAuth, getDataID } from '../../selectors/auth-selector'
import { getPosts, getStatus, getProfile } from '../../selectors/profile-selector'
// types
import { AppDispatchType } from '../../redux/redux-store'
// styles
import s from './Profile.module.scss'
import { getFullProfileThunk, profileActions, savePhotoThunk, updateStatusThunk } from '../../redux/profileReducer'

const Profile = () => {
	// hooks
	const navigate = useNavigate()
	let { id: ID } = useParams()

	// selectors
	const profile = useSelector(getProfile)
	const status = useSelector(getStatus)
	const posts = useSelector(getPosts)
	const selfID = useSelector(getDataID)
	const isAuth = useSelector(getAuth)

	// dispatch
	const dispatch: AppDispatchType = useDispatch()

	// functions
	const savePhoto = (photo: File) => {
		dispatch(savePhotoThunk(photo))
	}
	const updateStatus = (status: string) => {
		dispatch(updateStatusThunk(status))
	}

	const refreshProfile = () => {
		// i check existing id for... aa... just in case)
		if (id && !isNaN(id)) {
			if (profile?.userId !== id) {
				dispatch(getFullProfileThunk(id))
			}
		}
	}

	// component did mount
	useEffect(() => {
		refreshProfile()

		// component will unmount
		return () => {
			console.log('cleaning up --> unmount ')
			dispatch(profileActions.resetPage())
		}
	}, [])

	// checking is user authorized
	let id: number = Number(ID)
	let isFound = true

	const prevID = usePrevious(id)
	useEffect(() => {
		if (!isAuth || !selfID || isNaN(selfID)) {
			navigate('/login')
		}
		if (id !== (isNaN(prevID) ? id : prevID)) refreshProfile()
	}, [id])

	// fucking useEffect!
	isFound = !id || isNaN(id) ? false : true

	const owner = selfID === id

	// render
	if (!isFound) {
		return <Error404 />
	}
	if (!profile) {
		return <Preloader />
	}
	return (
		<section className={s.profile}>
			<div className={s.wrapper}>
				<User owner={owner} profile={profile} savePhoto={savePhoto} status={status} updateStatus={updateStatus} />
				<Posts posts={posts} owner={owner} />
			</div>
		</section>
	)
}

export default Profile
