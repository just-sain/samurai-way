import React from 'react';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { addPost } from '../../../../redux/profileReducer';


const mapStateToProps = state => ({});

const FormContainer = connect(mapStateToProps, {addPost})(PostForm);


export default FormContainer;