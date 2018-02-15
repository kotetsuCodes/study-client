import { Map } from 'immutable'
import * as types from './actionTypes'

const initState = new Map({
  scienceQuestions: [],
})
export default function scienceReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_SCIENCE_QUESTIONS_SUCCESS:
      return state.set('scienceQuestions', action.questions)
    // case types.UPDATE_WORD_SCORE:
    //   return state.updatingWordScore
    // case types.UPDATE_WORD_SCORE_SUCCESS:
    //   return state.set(
    //     'sightWords',
    //     state.get('sightWords').map((sightWord) => {
    //       if (sightWord.word === action.word) {
    //         return action.word
    //       }
    //       return sightWord
    //     }),
    //   )
    default:
      return state
  }
}
