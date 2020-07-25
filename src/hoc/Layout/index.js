import React, {Component} from 'react';
import classes from './style.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';
import {connect} from 'react-redux';

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
	};

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer
					isOpen={this.state.menu}
					onClose={this.menuCloseHandler}
					isAuthenticated={this.props.isAuthenticated}
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

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Index);