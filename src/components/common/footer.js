import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../helpers/colors'

const FooterSection = styled.div`
  background-color: ${colors.pink};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 34px;
  padding: 8px 8px;
  margin-left: 200px;
`

class Header extends Component {
  logout() {
    localStorage.removeItem('authToken')
    this.props.history.push('/login')
  }

  render() {
    return (
      <FooterSection>
        <ul>
          <li>Copyright © 2018, Nova Software</li>
        </ul>
      </FooterSection>
    )
  }
}

const footerWithRouter = withRouter(Header)

export default footerWithRouter
