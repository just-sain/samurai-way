import React from 'react'

type TProps = {
	userName: string
	photo: string
	message: string
}

const Message = (props: TProps) => {
	return (
		<div className='p-4 mb-4 text-xm bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300'>
			<div className='flex'>
				<img className='w-12 h-12 mr-5 rounded' src={props.photo} alt='' />
				<p>{props.userName}</p>
			</div>
			<p>{props.message}</p>
		</div>
	)
}

export default Message
