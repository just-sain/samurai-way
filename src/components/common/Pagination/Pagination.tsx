import React from 'react'

import './Pagination.scss'

type PropsType = {
	onChangePage: (page: number) => void
	totalItemsCount: number
	pageSize: number
	currentPage: number
}

const Pagination = ({ onChangePage, totalItemsCount, pageSize, currentPage }: PropsType) => {
	// pages of users
	const pagesCount: number = Math.ceil(totalItemsCount / pageSize)

	const pages: Array<number> = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	// deleting unnecessary
	const pagesBlock = pages.map((page: number) => {
		type PageElementPropsType = { text: string }
		const PageElement = ({ text }: PageElementPropsType) => (
			<span
				title='page' // for unit test
				className={`navItem ${currentPage === page && 'selectedPage'}`}
				onClick={() => {
					onChangePage(page)
				}}>
				{text}
			</span>
		)

		if (page === pages[0] || page === pages[pages.length - 1]) {
			// if first page/last page
			if (pages[0] < currentPage - 3) {
				return <PageElement key={page} text={`${page} ...`} />
			} else if (pages[pages.length - 1] > currentPage + 3) {
				return <PageElement key={page} text={`... ${page}`} />
			} else {
				return <PageElement key={page} text={`${page}`} />
			}
		} else if (
			currentPage === page ||
			currentPage === page - 1 ||
			currentPage === page - 2 ||
			currentPage === page - 3 ||
			currentPage === page + 1 ||
			currentPage === page + 2 ||
			currentPage === page + 3
		) {
			return <PageElement key={page} text={`${page}`} /> // if 0/-1/-2/-3/+1/+2/+3 page
		}
	})

	return <>{pagesBlock}</>
}

export default Pagination
