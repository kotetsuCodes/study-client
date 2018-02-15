import shuffle from 'lodash/shuffle'
import SightWordApi from '../../api/studyApi'
import * as types from './actionTypes'

// const secretKey = process.env.SECRET_KEY

export function getAudioSuccess(data) {
  return { type: types.GET_AUDIO_SUCCESS, data }
}

export function getSightWordsSuccess(sightWords) {
  return { type: types.GET_SIGHT_WORDS_SUCCESS, sightWords }
}

export function updateWordScoreSuccess(payload) {
  return { type: types.UPDATE_WORD_SCORE_SUCCESS, payload }
}

export function getSightWords(studentId) {
  return function (dispatch) {
    return SightWordApi.getSightWords(studentId)
      .then((responseSightWords) => {
        const randomSightWords = shuffle(responseSightWords)
        dispatch(getSightWordsSuccess(randomSightWords))
      })
      .catch((error) => {
        throw error
      })
  }
}

export function updateWordScore(sightWord) {
  return function (dispatch) {
    return SightWordApi.updateWordScore(sightWord)
      .then((responseUpdateWordScore) => {
        dispatch(updateWordScoreSuccess(responseUpdateWordScore))
      })
      .catch((error) => {
        throw error
      })
  }
}
