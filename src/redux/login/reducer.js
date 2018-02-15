import { Map } from 'immutable'
import * as types from './actionTypes'

const initState = new Map({})
export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return state
    default:
      return state
  }
}
