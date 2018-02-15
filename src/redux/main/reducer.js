import { Map } from 'immutable'
import * as types from './actionTypes'

const initState = new Map({
  sightWords: [],
})
export default function mainReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_SIGHT_WORDS_SUCCESS:
      return state.set('sightWords', action.sightWords)
    case types.UPDATE_WORD_SCORE:
      return state.updatingWordScore
    case types.UPDATE_WORD_SCORE_SUCCESS:
      return state.set(
        'sightWords',
        state.get('sightWords').map((sightWord) => {
          if (sightWord.word === action.word) {
            return action.word
          }
          return sightWord
        }),
      )
    default:
      return state
  }
}
