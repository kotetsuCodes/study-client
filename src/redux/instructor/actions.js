import InstructorApi from '../../api/instructorApi'
import * as types from './actionTypes'

export function getStudentsSuccess(students) {
  return { type: types.GET_STUDENTS_SUCCESS, students }
}

export function getStudentDetailsSuccess(student) {
  return { type: types.GET_STUDENT_DETAILS_SUCCESS, student }
}

export function getStudents() {
  return function (dispatch) {
    return InstructorApi.getStudents()
      .then((responseStudents) => {
        dispatch(getStudentsSuccess(responseStudents))
      })
      .catch((error) => {
        throw error
      })
  }
}

export function getStudentDetails(studentId) {
  return function (dispatch) {
    return InstructorApi.getStudentDetails(studentId)
      .then((responseStudentDetails) => {
        dispatch(getStudentDetailsSuccess(responseStudentDetails))
      })
      .catch((error) => {
        throw error
      })
  }
}
