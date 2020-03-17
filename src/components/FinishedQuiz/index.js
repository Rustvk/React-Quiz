import React from 'react';
import classes from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import Button from '../UI/Button';

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((totals, key) => {
		if (props.results[key] === 'success') {
			totals++;
		}
		return totals;
	}, 0);
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{
					props.questions.map((item, index) => {
						return (
							<li key={index}>
								<strong>{index + 1}. </strong>
								{item.question}
								{
									props.results[item.id] === 'error' ?
										<i className={classes.error}><FontAwesomeIcon icon={faTimes}/></i> :
										<i className={classes.success}><FontAwesomeIcon icon={faCheck}/></i>
								}
							</li>
						);
					})
				}
			</ul>

			<p>Правильных ответов: {successCount} из {props.quizLength}</p>
			<div>
				<Button type="primary" onClick={props.repeatHandler}>Повторить</Button>
				<Link to='/'>
					<Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	);
};

export default FinishedQuiz;