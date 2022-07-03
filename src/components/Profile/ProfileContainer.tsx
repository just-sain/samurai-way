import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { compose } from 'redux'

import { profileActions, getStatus, updateStatus, getProfile, getFullProfile, savePhoto } from '../../redux/profileReducer'
import Profile from './Profile'
import Error404 from '../errors/Error404/Error404'
import { AppStateType } from '../../redux/redux-store'
import { TPost, TProfile } from '../../types/types'

type TOwnProps = {
	isFound: boolean
	owner: boolean
	id: number
}
type TProps = TRouterProps & TOwnProps

// second container component
class ProfileContainer extends React.PureComponent<TProps> {
	refreshProfile = () => {
		// i check existing id for... aa... just in case)
		if (this.props.id && !isNaN(this.props.id)) {
			if (this.props.profile?.userId !== this.props.id) {
				this.props.getFullProfile(this.props.id)
			}
		}
	}

	componentDidMount = () => {
		this.refreshProfile()
	}

	componentWillUnmount = () => {
		this.props.resetPage()
	}

	componentDidUpdate = (prevProps: any) => {
		if (this.props.id !== prevProps.id) this.refreshProfile()
	}

	render = () => {
		if (!this.props.isFound) {
			return <Error404 />
		}

		return (
			<Profile
				profile={this.props.profile}
				posts={this.props.posts}
				owner={this.props.owner}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
			/>
		)
	}
}

type TRouterProps = TMapState & TMapDispatch

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
const ProfileRouter = (props: TRouterProps) => {
	const navigate = useNavigate()
	let { id: ID } = useParams()
	let id: number = Number(ID)
	let isFound = true

	// checking is user authorized
	useEffect(() => {
		if (!props.isAuth || !props.selfID || isNaN(props.selfID)) {
			navigate('/login')
		}
	}, [id])

	// fucking useEffect!
	isFound = !id || isNaN(id) ? false : true

	const owner = props.selfID === id

	return <ProfileContainer {...props} owner={owner} isFound={isFound} id={id} />
}

// props
type TMapState = {
	profile: null | TProfile
	status: null | string
	posts: Array<TPost>
	selfID: null | number
	isAuth: boolean
}
const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	posts: state.profilePage.posts,
	selfID: Number(state.auth.data.id),
	isAuth: state.auth.isAuth
})
type TMapDispatch = {
	resetPage: () => void
	getStatus: (userID: number) => void
	updateStatus: (status: string) => void
	getProfile: (userID: number) => void
	getFullProfile: (userID: number) => void
	savePhoto: (photo: File) => void
}
const resetPage = profileActions.resetPage

// from right to left
export default compose(
	connect<TMapState, TMapDispatch, {}, AppStateType>(mapStateToProps, {
		getStatus,
		updateStatus,
		getProfile,
		resetPage,
		getFullProfile,
		savePhoto
	})
)(ProfileRouter)
