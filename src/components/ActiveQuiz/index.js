import React from 'react';
import classes from './style.module.scss';
import AnswersList from './AnswersList';

const ActiveQuiz = props => (
	<div className={classes.ActiveQuiz}>
		<p className={classes.Question}>
			<span>
				<strong>{props.answerNumber}. </strong>
				{props.question}
			</span>

			<small>{props.answerNumber} из {props.quizLength}</small>
		</p>
		<AnswersList
			answers = {props.answers}
			onAnswerClick={props.onAnswerClick}
			answerState={props.answerState}
		/>
	</div>
);

export default ActiveQuiz;
