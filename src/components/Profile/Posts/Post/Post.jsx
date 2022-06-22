import React from 'react';

import s from './Post.module.scss';

const Post = props => {
	return (
		<div className={s.post}>
			<p>{props.text} | likes: {props.likes}</p>
		</div>
	);
};

export default Post;