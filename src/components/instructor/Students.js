import React, { Component } from 'react'
import { Grid, Cell } from 'styled-css-grid'
import { Link } from 'react-router-dom'

export default class Students extends Component {
  render() {
    const { students } = this.props
    return (
      <div>
        <Grid columns={4}>
          <Cell width={1} top={1}>
            StudentId
          </Cell>
          <Cell width={1} top={1}>
            Last Name
          </Cell>
          <Cell width={1} top={1}>
            First Name
          </Cell>
        </Grid>

        {students.map((student, index) => (
          <Grid columns={4}>
            <Cell width={1} top={index + 1}>
              {student.student.studentId}
            </Cell>
            <Cell width={1} top={index + 1}>
              {student.lastName}
            </Cell>
            <Cell width={1} top={index + 1}>
              {student.firstName}
            </Cell>
            <Cell width={1} top={index + 1}>
              <Link to={`/instructor/dashboard/students/${student.studentId}`}>
                <button>View Details</button>
              </Link>
            </Cell>
          </Grid>
        ))}
      </div>
    )
  }
}
