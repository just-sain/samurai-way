import React from 'react';

import s from './Preloader.module.scss';

const Preloader = () => {
	return (
		<div className={s.loaderWrapper}>
			<div className={s.loader}>
				<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
			</div>
		</div>
	);
};

export default Preloader;