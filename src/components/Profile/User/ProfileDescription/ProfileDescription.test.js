import React from 'react';
import { createRoot } from 'react-dom/client';

import ProfileDescription from './ProfileDescription';

it('can render and update a ProfileDescription component', () => {
	let container = createRoot(document.createElement('div'));
	container.render(<ProfileDescription />);
	container.unmount();
	container = null;
});
