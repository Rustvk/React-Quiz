import React, {Component} from 'react';
import Layout from './hoc/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Quiz from './containers/Quiz';
import Auth from './containers/Auth';
import QuizCreator from './containers/QuizCreator';
import QuizList from './containers/QuizList';
import {connect} from 'react-redux';
import Logout from './components/Logout';
import {autoLogin} from './store/actions/auth';

class App extends Component {
	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth}/>
				<Route path="/quizCreator" component={QuizCreator}/>
				<Route path="/quiz/:id" component={Quiz}/>
				<Route path="/" exact={true} component={QuizList}/>
				<Redirect to={"/"}/>
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/quizCreator" component={QuizCreator}/>
					<Route path="/quiz/:id" component={Quiz}/>
					<Route path="/logout" component={Logout}/>
					<Route path="/" exact={true} component={QuizList}/>
					<Redirect to={"/"}/>
				</Switch>
			)
		}

		return (
			<Layout>
				{ routes }
			</Layout>
		);
	}

	componentDidMount() {
		this.props.autoLogin();
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

function mapDispatchToProps(dispatch) {
	return {
		autoLogin: () => dispatch(autoLogin())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
