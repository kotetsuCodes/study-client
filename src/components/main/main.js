import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SightWords from './SightWords'
import * as mainActions from '../../redux/main/actions'
import auth from '../../helpers/auth'

class Main extends React.Component {
  componentWillMount() {
    this.props.actions.getSightWords(auth.checkToken(auth.getToken()).nameid)
  }

  render() {
    const { sightWords } = this.props

    return (
      <div>
        {sightWords.length > 0 ? (
          <SightWords
            sightWords={sightWords}
            checkIfCorrect={this.checkIfCorrect}
            updateWordScore={this.props.actions.updateWordScore}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
  sightWords: state.main.get('sightWords'),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...mainActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
