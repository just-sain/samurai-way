import React from 'react';
import { connect } from 'react-redux';
import Aside from './Aside';

const mapStateToProps = state => ({
	userID: state.auth.data.id,
});

export default connect(mapStateToProps)(Aside);
