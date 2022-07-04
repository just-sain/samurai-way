import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withAuthNavigate from '../../hoc/withAuthNavigate' // HOC
import Dialogs from './Dialogs' // common component
import { actions } from '../../redux/dialogsReducer'
// types
import { AppStateType } from '../../redux/redux-store'
import { TDialogs, TMessages } from '../../types/types'

type TProps = TMapState & TMapDispatch

class DialogsContainer extends React.PureComponent<TProps> {
	render() {
		return <Dialogs {...this.props} />
	}
}

type TMapState = {
	dialogs: Array<TDialogs>
	messages: Array<TMessages>
}
const mapStateToProps = (state: AppStateType) => ({
	dialogs: state.dialogsPage.dialogs,
	messages: state.dialogsPage.messages
})
type TMapDispatch = {
	sendMessage: (message: string) => void
}

const { sendMessage } = actions

// from right to left
export default compose(connect<TMapState, TMapDispatch, {}, AppStateType>(mapStateToProps, { sendMessage }), withAuthNavigate)(DialogsContainer)
