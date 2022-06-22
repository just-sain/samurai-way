import React from 'react';

import s from './Posts.module.scss';
import FormContainer from './PostForm/PostFormContainer';
import Post from './Post/Post';

// React.memo it's like HOC
const MyPosts = React.memo(props => {
	const posts = props.posts.map(post => <Post key={post.id} text={post.text} likes={post.likes} />);

	return (
		<div className={s.publish}>
			<FormContainer />

			<div className={s.postsContainer}>
				<h1 className={s.title}>My posts</h1>
				<div className={s.posts}>{posts}</div>
			</div>
		</div>
	);
});

export default MyPosts;
