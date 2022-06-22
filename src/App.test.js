import React from 'react';
import { createRoot } from 'react-dom/client';

import AppWithProvider from './App';

// test
it('run without crashing', () => {
	const div = createRoot(document.createElement('div'));
	div.render(<AppWithProvider />);
	div.unmount();
});
