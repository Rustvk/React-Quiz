import React from 'react';
import classes from './style.module.scss'

const Loader = props => {
	return (
		<div className={classes.center}>
			<div className={classes.Loader}>
				<div/>
				<div/>
			</div>
		</div>
	)
};

export default Loader;