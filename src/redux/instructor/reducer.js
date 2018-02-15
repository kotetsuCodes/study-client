import { Map } from 'immutable'
import * as types from './actionTypes'

const initState = new Map({
  students: [],
  studentDetails: null,
})
export default function instructorReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_STUDENTS_SUCCESS:
      return state.set('students', action.students)
    case types.GET_STUDENT_DETAILS_SUCCESS:
      return state.set('studentDetails', action.student)
    default:
      return state
  }
}
