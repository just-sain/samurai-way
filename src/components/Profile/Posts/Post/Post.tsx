import React from 'react'

import s from './Post.module.scss'

type TProps = {
	text: string
	likes: number
}

const Post = (props: TProps) => {
	return (
		<div className={s.post}>
			<p>
				{props.text} | likes: {props.likes}
			</p>
		</div>
	)
}

export default Post
