import auth from '../helpers/auth'

const baseApiPath = process.env.REACT_APP_API_BASE_URL

const getStudentsUrl = `${baseApiPath}Instructor/Students`
const getStudentDetailsUrl = `${baseApiPath}Instructor/Students/[STUDENT_ID]`

class InstructorApi {
  static getStudents() {
    const request = new Request(getStudentsUrl, {
      headers: { Authorization: `Bearer ${auth.getToken()}` },
      method: 'GET',
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }

  static getStudentDetails(studentId) {
    const request = new Request(getStudentDetailsUrl.replace('[STUDENT_ID]', studentId), {
      headers: { Authorization: `Bearer ${auth.getToken()}` },
      method: 'GET',
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }
}

export default InstructorApi
