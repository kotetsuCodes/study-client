import shuffle from 'lodash/shuffle'
import StudyApi from '../../api/studyApi'
import * as types from './actionTypes'

export function getScienceQuestionsSuccess(questions) {
  return { type: types.GET_SCIENCE_QUESTIONS_SUCCESS, questions }
}

export function getScienceQuestions(studentId) {
  return function (dispatch) {
    return StudyApi.getScienceQuestions(studentId)
      .then((responseQuestions) => {
        const randomQuestions = shuffle(responseQuestions)
        dispatch(getScienceQuestionsSuccess(randomQuestions))
      })
      .catch((error) => {
        throw error
      })
  }
}

