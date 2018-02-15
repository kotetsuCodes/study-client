import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ScienceQuestions from './ScienceQuestions'
import * as scienceActions from '../../redux/science/actions'
import auth from '../../helpers/auth'

class Science extends React.Component {
  componentWillMount() {
    this.props.actions.getScienceQuestions(auth.checkToken(auth.getToken()).nameid)
  }

  render() {
    const { scienceQuestions } = this.props

    return (
      <div>
        {scienceQuestions.length > 0 ? (
          <ScienceQuestions
            scienceQuestions={scienceQuestions}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state,
  scienceQuestions: state.science.get('scienceQuestions'),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...scienceActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Science)
