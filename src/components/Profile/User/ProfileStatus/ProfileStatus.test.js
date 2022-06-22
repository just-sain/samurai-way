import React from 'react';
import { createRoot } from 'react-dom/client';

import ProfileStatus from './ProfileStatus';

it('can render and update a ProfileStatus component', () => {
	let container = createRoot(document.createElement('div'));
	container.render(<ProfileStatus />);
	container.unmount();
	container = null;
});
