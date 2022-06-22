import React from 'react';

import profileReducer, { addPost, deletePost } from './profileReducer';

it('length of posts should be increment', () => {
	// step 1/ initial data
	const action = addPost('Hello, World!');

	const state = {
		posts: [
			{ id: 1, text: 'hi i am not a returt', likes: 10 },
			{ id: 2, text: 'hi i am returt', likes: 25 },
			{ id: 3, text: 'mmm yeah...', likes: 0 },
		],
	};

	/// step 2/ action
	const newState = profileReducer(state, action);

	//step 3/  expectation
	expect(newState.posts.length).toBe(4);
});

it('the text of new element in posts should be equal "Hi"', () => {
	const action = addPost('Hi');

	const state = {
		posts: [
			{ id: 1, text: 'hi i am not a aa', likes: 10 },
			{ id: 2, text: 'hi i am not ugly', likes: 25 },
			{ id: 3, text: 'mmm yeah...', likes: 0 },
		],
	};

	const newState = profileReducer(state, action);

	expect(newState.posts[3].text).toBe('Hi');
});

it('length of posts should be increment', () => {
	// step 1/ initial data
	const action = deletePost(3);

	const state = {
		posts: [
			{ id: 1, text: 'hi i am not a returt', likes: 10 },
			{ id: 2, text: 'hi i am returt', likes: 25 },
			{ id: 3, text: 'mmm yeah...', likes: 0 },
		],
	};

	/// step 2/ action
	const newState = profileReducer(state, action);

	//step 3/  expectation
	expect(newState.posts.length).toBe(2);
});

it(`length of posts should be stay on basic value if id is incorrect`, () => {
	// step 1/ initial data
	const action = deletePost(100);

	const state = {
		posts: [
			{ id: 1, text: 'hi i am not a returt', likes: 10 },
			{ id: 2, text: 'hi i am returt', likes: 25 },
			{ id: 3, text: 'mmm yeah...', likes: 0 },
		],
	};

	/// step 2/ action
	const newState = profileReducer(state, action);

	//step 3/  expectation
	expect(newState.posts.length).toBe(3);
});
