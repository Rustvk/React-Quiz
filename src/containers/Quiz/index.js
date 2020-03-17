import React, {Component} from 'react';
import classes from './style.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz';

class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answerState: null, // {[id]: 'success' 'error'}
		quiz: [
			{
				id: 0,
				rightAnswer: 1,
				question: 'Какого цвета небо?',
				answers: [
					{
						id: 1,
						text: 'Синий'
					},
					{
						id: 2,
						text: 'Красный'
					},
					{
						id: 3,
						text: 'Черный'
					},
					{
						id: 4,
						text: 'Белый'
					}
				]
			},
			{
				id: 1,
				rightAnswer: 3,
				question: 'Какого цвета земля?',
				answers: [
					{
						id: 1,
						text: 'Синий'
					},
					{
						id: 2,
						text: 'Красный'
					},
					{
						id: 3,
						text: 'Черный'
					},
					{
						id: 4,
						text: 'Белый'
					}
				]
			}
		]
	};

	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	};

	repeatHandler = () => {
		this.setState({
			results: {},
			isFinished: false,
			activeQuestion: 0,
			answerState: null, // {[id]: 'success' 'error'}
		})
	};

	componentDidMount() {
		console.log('Quiz ID =', this.props.match.params.id);
	}

	onAnswerClickHandler = (answerId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}
		const question = this.state.quiz[this.state.activeQuestion];
		const isRight = answerId === question.rightAnswer;
		const answerState = isRight ? 'success' : 'error';
		const results = this.state.results;
		if (!results[this.state.activeQuestion]) {
			results[this.state.activeQuestion] = answerState;
		}
		this.setState({
			answerState: {[answerId]: answerState},
			results
		});

		if (isRight) {
			const timeout = window.setTimeout(() => {
				if (!this.isQuizFinished()) {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					});
				} else {
					this.setState({
						isFinished: true
					})
				}
				window.clearTimeout(timeout);
			}, 1000);
		}
	};

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					{
						this.state.isFinished ?
							<FinishedQuiz
								results = { this.state.results }
								questions = { this.state.quiz }
								quizLength = {this.state.quiz.length}
								repeatHandler={this.repeatHandler}
							/> :
							<>
								<h1>Ответьте на все вопросы</h1>
								< ActiveQuiz
									key = {this.state.activeQuestion}
									answers = {this.state.quiz[this.state.activeQuestion].answers}
									question = {this.state.quiz[this.state.activeQuestion].question}
									onAnswerClick = {this.onAnswerClickHandler}
									quizLength = {this.state.quiz.length}
									answerNumber = {this.state.activeQuestion + 1}
									answerState={this.state.answerState}
									/>
							</>
					}
				</div>
			</div>
		);
	}
}

export default Quiz;