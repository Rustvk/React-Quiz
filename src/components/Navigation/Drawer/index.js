import React, {Component} from 'react';
import classes from './style.module.scss';
import Backdrop from '../../UI/Backdrop';
import {NavLink} from 'react-router-dom';

class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	};

	renderLinks = (links) => {
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
		const links = [
			{to: '/', label: 'Список', exact: true}
		];

		if (this.props.isAuthenticated) {
			links.push({to: '/quizCreator', label: 'Создать тест', exact: false});
			links.push({to: '/logout', label: 'Выйти', exact: false});
		} else {
			links.push({to: '/auth', label: 'Авторизация', exact: false})
		}

		return (
			<>
				{
					this.props.isOpen ?
						<Backdrop onClick={ this.props.onClose }/> :
						null
				}
				<nav className={cls.join(' ')}>
					<ul>
						{ this.renderLinks(links) }
					</ul>
				</nav>
			</>
		);
	}
}

export default Drawer;