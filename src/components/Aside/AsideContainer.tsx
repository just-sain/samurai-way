import React from 'react'
import { connect } from 'react-redux'

import { AppStateType } from '../../redux/redux-store' // types
import { getDataID } from '../../selectors/auth-selector' // selector

import Aside from './Aside'

type mapStatePropsType = {
	userID: null | number
}

const mapStateToProps = (state: AppStateType) => ({
	userID: getDataID(state)
})

export default connect<mapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(Aside)
