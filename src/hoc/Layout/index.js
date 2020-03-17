import React, {Component} from 'react';
import classes from './style.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';

class Index extends Component {
	state = {
		menu: false
	};

	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		});
	};

	menuCloseHandler = () => {
		this.setState({
			menu: false
		})
	}

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer
					isOpen={this.state.menu}
					onClose={this.menuCloseHandler}
				/>
				<MenuToggle
					isOpen={this.state.menu}
					onToggle={this.toggleMenuHandler}
				/>
				<main>
					{ this.props.children }
				</main>
			</div>
		);
	}
}

export default Index;