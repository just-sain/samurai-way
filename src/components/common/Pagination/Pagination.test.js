import { render } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component test', () => {
	it('total items count is below than page size and pages count must be 1', () => {
		const { unmount, getAllByTitle } = render(
			<Pagination onChangePage={() => {}} totalItemsCount={9} pageSize={10} currentPage={1} />
		);

		const pages = getAllByTitle('page').length;
		expect(pages).toBe(1);

		unmount();
	});

	it('total items count is above than page size and pages count must be 2', () => {
		const { unmount, getAllByTitle } = render(
			<Pagination onChangePage={() => {}} totalItemsCount={11} pageSize={10} currentPage={1} />
		);

		const pages = getAllByTitle('page').length;
		expect(pages).toBe(2);

		unmount();
	});
});
