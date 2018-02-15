import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../helpers/colors'

const HeaderSection = styled.div`
  background-color: ${colors.pink};
  position: fixed;
  width: 100%;
  top: 0;
  padding: 8px 8px;
  height: 34px;
  margin-left: 200px;
`

const LogoutButton = styled.button`
  padding: 8px 8px;
  background-color: ${colors.blue};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`

class Header extends Component {
  logout() {
    localStorage.removeItem('authToken')
    this.props.history.push('/login')
  }

  render() {
    return (
      <HeaderSection>
        <ul>
          <li>
            <LogoutButton onClick={e => this.logout(e)} href="#">
              Logout <i className="fas fa-sign-out-alt" />
            </LogoutButton>
          </li>
        </ul>
      </HeaderSection>
    )
  }
}

const headerWithRouter = withRouter(Header)

export default headerWithRouter
