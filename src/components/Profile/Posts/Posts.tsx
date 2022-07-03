import React from 'react'

import FormContainer from './PostForm/PostFormContainer'
import Post from './Post/Post'

import { TPost } from '../../../types/types' // type
import s from './Posts.module.scss'

type TProps = {
	posts: Array<TPost>
	owner: boolean
}

// React.memo it's like HOC
const MyPosts = React.memo((props: TProps) => {
	const posts = props.posts.map(post => <Post key={post.id} text={post.text} likes={post.likes} />)

	return (
		<div className={s.publish}>
			{props.owner && <FormContainer />}

			<div className={s.postsContainer}>
				<h1 className={s.title}>My posts</h1>
				<div className={s.posts}>{posts}</div>
			</div>
		</div>
	)
})

export default MyPosts
