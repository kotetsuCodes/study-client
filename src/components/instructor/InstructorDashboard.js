import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as instructorActions from '../../redux/instructor/actions'
import Students from './Students'

export class InstructorDashboard extends Component {
  componentWillMount() {
    this.props.actions.getStudents(1)
  }

  render() {
    return (
      <div>
        Welcome to the instructor page
        <Students students={this.props.students} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
  students: state.instructor.get('students'),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...instructorActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard)
