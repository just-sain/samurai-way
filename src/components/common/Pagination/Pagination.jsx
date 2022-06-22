import React from 'react';

import s from './Pagination.module.scss';

const Pagination = ({ onChangePage, totalItemsCount, pageSize, currentPage }) => {
	// pages of users
	const pagesCount = Math.ceil(totalItemsCount / pageSize);

	const pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	// deleting unnecessary
	const pagesBlock = pages.map(page => {
		const PageElement = ({ text }) => (
			<span
				title='page' // for unit test
				className={`${s.navItem} ${currentPage === page && s.selectedPage}`}
				onClick={() => {
					onChangePage(page);
				}}>
				{text}
			</span>
		);

		if (page === pages[0] || page === pages[pages.length - 1]) {
			// if first page/last page
			if (pages[0] < currentPage - 3) {
				return <PageElement key={page} text={`${page} ...`} />;
			} else if (pages[pages.length - 1] > currentPage + 3) {
				return <PageElement key={page} text={`... ${page}`} />;
			} else {
				return <PageElement key={page} text={page} />;
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
			return <PageElement key={page} text={page} />; // if 0/-1/-2/-3/+1/+2/+3 page
		}

		/*
		// ful version
		if (page === pages[0]) {
			// if first page
			if (pages[0] < currentPage - 3) {
				return <PageElement key={page} text={`${page} ...`} />;
			} else {
				return <PageElement key={page} text={page} />;
			}
		} else if (currentPage === page - 1 || currentPage === page - 2) {
			return <PageElement key={page} text={page} />; // if -1, -2 page
		} else if (currentPage === page) {
			return <PageElement key={page} text={page} />; // if current page is page
		} else if (currentPage === page + 1 || currentPage === page + 2) {
			return <PageElement key={page} text={page} />; // if +1, +2 page
		} else if (page === pages[pages.length - 1]) {
			// if last page
			if (pages[pages.length - 1] > currentPage + 3) {
				return <PageElement key={page} text={`... ${page}`} />;
			} else {
				return <PageElement key={page} text={page} />;
			}
		}
		*/
	});

	return pagesBlock;
};

export default Pagination;
