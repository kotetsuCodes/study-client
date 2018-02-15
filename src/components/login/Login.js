import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import { Grid, Cell } from 'styled-css-grid'
import * as loginActions from '../../redux/login/actions'
import colors from '../../helpers/colors'
import TextInput from '../common/TextInput.style'

const LoginButton = styled.input`
  padding: 16px 16px;
  background-color: ${colors.blue};
  border: none;
  font-size: 1.5rem;
  width: 100%;

  &:hover {
    background-color: ${tinycolor(colors.blue)
    .lighten(4)
    .toString()};
  }
`

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.state.username) {
      // warn user of validation error
    }

    if (!this.state.password) {
      // warn user of validation error
    }

    this.props.actions.Login(this.props.history, this.state.username, this.state.password)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div>
        <Grid columns={3} style={{ width: '100%', height: '100vh' }}>
          <Cell left={2} top={2}>
            <Grid columns={1}>
              <Cell width={1} top={1} center middle>
                <h3>Welcome to the Login Page</h3>
              </Cell>
              <Cell width={1} top={2}>
                <TextInput name="username" onChange={this.handleUsernameChange} />
              </Cell>
              <Cell width={1} top={3}>
                <TextInput
                  name="password"
                  type="password"
                  onChange={this.handlePasswordChange}
                  onKeyPress={e => this.handleKeyPress(e)}
                />
              </Cell>
              <Cell width={1} top={4}>
                <LoginButton type="submit" value="Login" onClick={e => this.handleSubmit(e)} />
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...loginActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
