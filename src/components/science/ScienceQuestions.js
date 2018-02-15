import React, { Component } from 'react'
import styled from 'styled-components'
import random from 'lodash/random'
import { Grid, Cell } from 'styled-css-grid'
import Confetti from 'react-confetti'
import tinycolor from 'tinycolor2'
import loseSound from '../../audio/crowd-groan.mp3'
import winSound from '../../audio/crowd-cheer.mp3'
import colors from '../../helpers/colors'
import SelectDropdown from '../common/selectDropdown'

const blue = '#2274A5'
// const pink = '#E83F6F'
const green = '#32936F'
// const yellow = '#FFBF00'

const VoiceSelectorContainer = styled.div`
  padding: 12px 12px;
`

const AnswerOption = styled.div`
  display: inline-block;
  background-color: ${colors.blue};
  padding: 16px 16px;
  border-radius: 5px;
  margin: 0 4px 0 4px;
  font-size: 1.5rem;
  cursor: pointer;
`

const AnswerAudioButton = styled.button`
  display: inline-block;
  background-color: ${colors.green};
  padding: 16px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`

const PromptButton = styled.button`
  display: inline-block;
  background-color: ${colors.pink};
  padding: 8px 8px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`

export default class ScienceQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: null,
      voiceApi: null,
      voices: [],
      currentVoiceIndex: null,
      showConfetti: false,
    }
  }

  componentWillMount() {
    this.selectRandomScienceQuestion()
    this.setState({
      voiceApi: window.speechSynthesis,
    })
  }

  componentDidMount() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.setState({ voices: window.speechSynthesis.getVoices() })
    }

    // this.selectRandomScienceQuestion()
    this.prompt()
  }

  checkIfCorrect = (e, answer) => {
    if (answer.isCorrect) {
      const audio = new Audio()

      audio.src = winSound
      audio.play()

      this.setState({ showConfetti: true })
      setTimeout(() => {
        this.setState({ showConfetti: false })
        this.selectRandomScienceQuestion()
        this.prompt()
      }, 6000)
    } else {
      this.speakText('I\'m sorry that is incorrect')
    }
  }

  selectRandomScienceQuestion() {
    const randomQuestionIndex = random(0, this.props.scienceQuestions.length - 1)
    this.setState({
      currentQuestion: this.props.scienceQuestions[randomQuestionIndex],
    })
  }

  speakText = (text) => {
    const speechUtterance = new SpeechSynthesisUtterance(text)
    speechUtterance.voice = this.state.voices[this.state.currentVoiceIndex]
    speechUtterance.rate = 0.5

    this.state.voiceApi.speak(speechUtterance)
  }

  prompt = (e) => {
    this.speakText(this.state.currentQuestion.questionText)
  }

  handleVoiceChange = (index) => {
    this.setState({ currentVoiceIndex: index })
  }

  hearAnswerText = (e, answer) => {
    this.speakText(answer.answerText)
  }

  render() {
    const { showConfetti, voices, currentQuestion } = this.state

    const voiceSelectOptions = voices.map((voice, index) => ({
      displayName: voice.name,
      value: index,
      isSelected: index === 0,
    }))

    return (
      <div>
        {showConfetti ? (
          <div
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              run={showConfetti}
              gravity={0.4}
              recycle={false}
            />
          </div>
        ) : null}

        <Grid columns={12} style={{ margin: '16px 16px' }}>
          <Cell width={4} middle>
            <VoiceSelectorContainer>
              {voiceSelectOptions.length > 0 ? (
                <SelectDropdown
                  selectOptions={voiceSelectOptions}
                  onSelect={this.handleVoiceChange}
                />
              ) : null}
            </VoiceSelectorContainer>
          </Cell>
        </Grid>

        {/* <Cell left={1} top={2} height={4} width={3}>
            <RepromptButton onClick={e => this.prompt()}>
              Hear it again <i className="fas fa-volume-up" />
            </RepromptButton>
          </Cell>
        </Grid> */}

        <Grid columns={1}>
          <Cell top={1} left={1}>
            <PromptButton onClick={e => this.prompt()}>
              <i className="fas fa-volume-up" />
            </PromptButton>

            <div style={{ display: 'inline-block', 'margin-left': '4px' }}>
              {currentQuestion.questionText}?
            </div>
          </Cell>

          {currentQuestion.answers.map((answer, index) => (
            <div key={answer.answerId}>
              <Cell top={index + 1}>
                <AnswerAudioButton onClick={e => this.hearAnswerText(e, answer)}>
                  <i className="fas fa-volume-up" />
                </AnswerAudioButton>
                <AnswerOption onClick={e => this.checkIfCorrect(e, answer)}>
                  {answer.answerText}
                </AnswerOption>
              </Cell>
            </div>
          ))}
        </Grid>
      </div>
    )
  }
}
