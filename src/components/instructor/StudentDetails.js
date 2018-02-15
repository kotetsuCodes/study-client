import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as studentActions from '../../'

export class StudentDetails extends Component {
  componentWillMount() {
    this.props.actions.getStudent(this.props.match.params.studentId)
  }

  render() {
    return <div>Welcome to the Student Details Page</div>
  }
}

const mapStateToProps = state => ({
  ...state,
  studentDetails: state.studentDetails.get('studentDetails'),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...studentActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails)
