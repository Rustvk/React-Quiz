import React, {Component} from 'react';
import classes from './style.module.scss';
import Backdrop from '../../UI/Backdrop';
import {NavLink} from 'react-router-dom';

const links = [
	{to: '/', label: 'Список', exact: true},
	{to: '/Auth', label: 'Авторизация', exact: false},
	{to: '/QuizCreator', label: 'Создать тест', exact: false}
];

class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	};

	renderLinks = () => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeClassName={classes.active}
						onClick={this.clickHandler}
					>
						{link.label}
					</NavLink>
				</li>
			)
		})
	};

	render() {
		const cls = [classes.Drawer, this.props.isOpen ? '' : classes.close];
		return (
			<>
				{
					this.props.isOpen ?
						<Backdrop onClick={ this.props.onClose }/> :
						null
				}
				<nav className={cls.join(' ')}>
					<ul>
						{ this.renderLinks() }
					</ul>
				</nav>
			</>
		);
	}
}

export default Drawer;