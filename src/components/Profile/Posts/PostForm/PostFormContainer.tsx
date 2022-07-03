import { connect } from 'react-redux'

import { profileActions } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/redux-store'

import PostForm from './PostForm'

const mapStateToProps = (state: AppStateType) => ({})
const addPost = profileActions.addPost

export default connect(mapStateToProps, { addPost })(PostForm)
