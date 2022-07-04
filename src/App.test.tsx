import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

// test
it('run without crashing', () => {
	const div = createRoot(document.createElement('div'))
	div.render(<App />)
	div.unmount()
})
