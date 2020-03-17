import React from 'react';
import classes from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const MenuToggle = props => {
	const cls = [classes.MenuToggle, props.isOpen ? classes.open : ''];
	return (
		<i
			className={cls.join(' ')}
			onClick={props.onToggle}
		>
			<FontAwesomeIcon icon={ props.isOpen ? faTimes : faBars }/>
		</i>
	)
};

export default MenuToggle;