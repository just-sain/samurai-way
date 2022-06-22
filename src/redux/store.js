import profileReducer from './profileReducer';
import dialogReducer from './dialogsReducer';
import asideReducer from './asideReducer';

const store = {
	// data
	_state : {
		profilePage: {
			posts: [
				{ id: 1, text: "hi i am not a returt", likes: 10 },
				{ id: 2, text: "hi i am returt", likes: 25 },
				{ id: 3, text: "mmm yeah...", likes: 0 }
			],
			formText: '',
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: "marmok" },
				{ id: 2, name: "soi" },
				{ id: 3, name: "dosya" },
				{ id: 4, name: "viktor" },
				{ id: 5, name: "ubuntu" },
				{ id: 6, name: "vasily" },
				{ id: 7, name: "zhanaya" },
				{ id: 8, name: "aisere" },
				{ id: 9, name: "andrei" },
				{ id: 10, name: "katerina" }
			],

			messages: [
				{ id: 1, text: "hihi" },
				{ id: 2, text: "how are you" },
				{ id: 3, text: "were are you" }
			],
			messageInputText: '',
		},
		asidePage: {
			links: [
				{ "path": "/profile", "text": "Profile" },
				{ "path": "/dialogs", "text": "Dialogs" },
				{ "path": "/", "text": "News" },
				{ "path": "/music", "text": "Music" },
				{ "path": "/settings", "text": "Setting" }
			]
		}
	},

	// methods
	_callSubscriber() { console.log('_state was changed') },

	getState() { return this._state },

	subscribe(observer) { this._callSubscriber = observer; },

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
		this._state.asideReducer = asideReducer(this._state.asideReducer, action);

		this._callSubscriber(this);
	},
};


window.store = store;
export default store;