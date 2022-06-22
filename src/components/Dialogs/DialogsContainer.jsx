import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withAuthNavigate from '../../hoc/withAuthNavigate'; // HOC
import { sendMessage } from '../../redux/dialogsReducer';

import Dialogs from './Dialogs';

const mapStateToProps = state => ({
	dialogs: state.dialogsPage.dialogs,
	messages: state.dialogsPage.messages,
	messageInputText: state.dialogsPage.messageInputText,
});

class DialogsContainer extends React.Component {
	render() {
		return <Dialogs {...this.props} />;
	}
}

// from right to left
export default compose(connect(mapStateToProps, { sendMessage }), withAuthNavigate)(DialogsContainer);
