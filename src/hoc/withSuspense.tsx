import React, { Suspense, FC } from 'react'

import Preloader from '../components/common/Preloader/Preloader'

const withSuspense = (Component: FC) => (props: any) =>
	(
		<Suspense fallback={<Preloader />}>
			<Component {...props} />
		</Suspense>
	)

export default withSuspense
