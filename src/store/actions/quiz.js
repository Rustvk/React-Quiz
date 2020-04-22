import axios from '../../axios/axios-qiuz';
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY
} from './actionTypes';

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart());
		try {
			const respone = await axios.get('/quizes.json');
			const quizes = [];
			Object.keys(respone.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				});
			});
			dispatch(fetchQuizesSuccess(quizes));
		} catch (error) {
			dispatch(fetchQuizesError(error));
		}
	}
}

export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart());

		try {
			const respone = await axios.get(`/quizes/${quizId}.json`);
			dispatch(fetchQuizSuccess(respone.data));
		} catch (error) {
			dispatch(fetchQuizesError(error));
		}
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes
	}
}

export function fetchQuizesError(error) {
	return {
		type: FETCH_QUIZES_ERROR,
		error
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ,
	}
}

export function quizNextQuestion(number) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY
	}
}

export function quizAnswerClick(answerId) {
	return (dispatch, getState) => {
		const state = getState().quiz;
		if (state.answerState) {
			const key = Object.keys(state.answerState)[0];
			if (state.answerState[key] === 'success') {
				return;
			}
		}
		const question = state.quiz[state.activeQuestion];
		const isRight = answerId === question.rightAnswer;
		const answerState = isRight ? 'success' : 'error';
		const results = state.results;
		if (!results[state.activeQuestion]) {
			results[state.activeQuestion] = answerState;
		}
		dispatch(quizSetState({[answerId]: answerState}, results));

		if (isRight) {
			const timeout = window.setTimeout(() => {
				if (!isQuizFinished(state)) {
					dispatch(quizNextQuestion(state.activeQuestion + 1))
				} else {
					dispatch(finishQuiz())
				}
				window.clearTimeout(timeout);
			}, 1000);
		}
	}
}

function isQuizFinished(state) {
	return state.activeQuestion + 1 === state.quiz.length;
}