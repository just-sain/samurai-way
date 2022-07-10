import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import store from './redux/redux-store'

import './index.scss'

export const classNames = (...classes: string[]): string => {
	return classes.filter(Boolean).join(' ')
}

// UI
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const rerenderEntireTree = () => {
	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	)
}

rerenderEntireTree() // rerender entire tree
