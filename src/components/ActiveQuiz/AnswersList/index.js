import React from 'react';
import classes from './style.module.scss';
import AnswerItem from './AnswerItem';

const AnswersList = props => (
	<ul className={classes.AnswersList}>
		{
			props.answers.map((answer, index) => {
				return (
					<AnswerItem
						answerState = { props.answerState ? props.answerState[answer.id] : null}
						key = {index}
						answer = {answer}
						onAnswerClick={props.onAnswerClick}
					/>
				);
			})
		}
		<li>
		</li>
	</ul>
);

export default AnswersList;
