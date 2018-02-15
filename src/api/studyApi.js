import auth from '../helpers/auth'

const baseApiPath = process.env.REACT_APP_API_BASE_URL
const getSightWords = `${baseApiPath}Students/[STUDENT_ID]/SightWords`
const getScienceQuestions = `${baseApiPath}Students/[STUDENT_ID]/Subject/1/Questions`

class StudyApi {
  static getSightWords(studentId) {
    const request = new Request(getSightWords.replace('[STUDENT_ID]', studentId), {
      headers: { Authorization: `Bearer ${auth.getToken()}` },
      method: 'GET',
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }

  static getScienceQuestions(studentId) {
    const request = new Request(getScienceQuestions.replace('[STUDENT_ID]', studentId), {
      headers: { Authorization: `Bearer ${auth.getToken()}` },
      method: 'GET',
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }

  static updateWordScore(sightWord) {
    const headers = Object.assign({ 'Content-Type': 'application/json' })
    const request = new Request(getSightWords.replace('[STUDENT_ID]', sightWord.studentId), {
      method: 'PUT',
      headers,
      body: JSON.stringify(sightWord),
    })

    return fetch(request)
      .then(response => response.json())
      .catch(error => error)
  }
}

export default StudyApi
