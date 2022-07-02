import React from 'react'

import s from './Error404.module.scss'

const Error404 = () => {
	return (
		<section className={s.error}>
			<h2>Page not found</h2>
			<h1>404</h1>
		</section>
	)
}

export default Error404
