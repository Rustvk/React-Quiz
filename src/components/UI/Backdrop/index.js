import React from 'react';
import classes from './style.module.scss';

const Backdrop = props => <div className={classes.Backdrop} onClick={props.onClick}/>;

export default Backdrop;