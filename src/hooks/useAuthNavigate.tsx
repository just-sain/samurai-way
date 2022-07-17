import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from './useTypedSelector'

import { getDataID } from '../selectors/auth-selectors'

export const useAuthNavigate = () => {
	const navigate = useNavigate()
	const id: number | null = useTypedSelector(getDataID)

	const checkIfAuth = () => {
		if (id === null) navigate('/login')
	}

	return { checkIfAuth }
}
