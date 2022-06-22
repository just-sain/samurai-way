import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './DialogItem.module.scss';

const DialogItem = props => {
	const path = "/dialogs/" + props.id;
	return <NavLink className={s.item} to={path}>{props.children}</NavLink>
};

export default DialogItem;