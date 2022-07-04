import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import s from './Search.module.scss'

export type TFormValues = {
	search: string
	friend: string
}
type TProps = {
	onSearchUsers: (search: string, friend: null | boolean) => void
}

const Search = (props: TProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const searchTerm = searchParams.get('search') || ''
	let searchFriend = searchParams.get('friend') || ''
	const { handleSubmit, register } = useForm<TFormValues>({
		defaultValues: {
			search: searchTerm,
			friend: searchFriend === 'true' ? 'only' : searchFriend === 'false' ? 'not' : 'all'
		}
	})

	const onSubmit: SubmitHandler<TFormValues> = data => {
		const { search, friend } = data
		const resParams: any = {}

		let resultFriend: null | boolean = null
		if (friend === 'only') resultFriend = true
		else if (friend === 'not') resultFriend = false
		else resultFriend = null

		if (resultFriend !== null) {
			resParams.friend = resultFriend.toString()
		}
		if (search) resParams.search = search

		setSearchParams(resParams)
		props.onSearchUsers(search, resultFriend)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={s.form} placeholder='Search...'>
			<input {...register('search')} type='text' className={s.search} placeholder='name...' />
			<div className={s.filter}>
				<label>
					<input {...register('friend')} type='radio' name='friend' value='all' /> <span>All</span>
				</label>
				<label>
					<input {...register('friend')} type='radio' name='friend' value='only' /> <span>Friends</span>
				</label>
				<label>
					<input {...register('friend')} type='radio' name='friend' value='not' /> <span>Strangers</span>
				</label>
			</div>
			<button type='submit' className={s.btn}>
				search
			</button>
		</form>
	)
}

export default Search
