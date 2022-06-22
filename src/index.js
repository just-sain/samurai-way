import React from 'react';
import ReactDOM from 'react-dom/client';

import AppWithProvider from './App';

// UI
const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree = () => {
	root.render(<AppWithProvider />);
};

rerenderEntireTree(); // rerender entire tree
