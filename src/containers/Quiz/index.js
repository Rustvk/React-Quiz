import React, {Component} from 'react';
import classes from './style.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';
import Loader from '../../components/UI/Loader';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';
import {connect} from 'react-redux';

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.retryQuiz();
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					{
						this.props.loading || !this.props.quiz ?
							<Loader/> :
							this.props.isFinished ?
								<FinishedQuiz
									results = { this.props.results }
									questions = { this.props.quiz }
									quizLength = {this.props.quiz.length}
									repeatHandler={this.props.retryQuiz}
								/> :
								<>
									<h1>Ответьте на все вопросы</h1>
									< ActiveQuiz
										key = {this.props.activeQuestion}
										answers = {this.props.quiz[this.props.activeQuestion].answers}
										question = {this.props.quiz[this.props.activeQuestion].question}
										onAnswerClick = {this.props.quizAnswerClick}
										quizLength = {this.props.quiz.length}
										answerNumber = {this.props.activeQuestion + 1}
										answerState={this.props.answerState}
									/>
								</>
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);