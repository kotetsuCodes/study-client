import React, { Component } from 'react'
import styled from 'styled-components'
import random from 'lodash/random'
import { Grid, Cell } from 'styled-css-grid'
import Confetti from 'react-confetti'
import loseSound from '../../audio/crowd-groan.mp3'
import winSound from '../../audio/crowd-cheer.mp3'
import SelectDropdown from '../common/selectDropdown'

const blue = '#2274A5'
const lighterBlue = '#4A8DB5'
// const pink = '#E83F6F'
const green = '#32936F'
// const yellow = '#FFBF00'

const SightWordSelector = styled.button`
  padding: 12px 12px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: ${blue};
  font-size: 32px;

  &:hover {
    background-color: ${lighterBlue};
  }

  &:focus {
    outline: none;
  }
`

const VoiceSelectorContainer = styled.div`
  padding: 12px 12px;
`

const RepromptButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: ${green};
  font-size: 32px;
  cursor: pointer;
`

export default class SightWords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWord: null,
      voiceApi: null,
      voices: [],
      currentVoiceIndex: null,
      showConfetti: false,
    }
  }

  componentWillMount() {
    this.selectRandomSightWord()
    this.setState({
      voiceApi: window.speechSynthesis,
    })
  }

  componentDidMount() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.setState({ voices: window.speechSynthesis.getVoices() })
    }

    this.selectRandomSightWord()
    this.prompt()
  }

  checkIfCorrect = (e, sightWord) => {
    const currentWord = this.props.sightWords.find(sw => sw.word === this.state.currentWord)
    const audio = new Audio()

    this.setState({ showConfetti: false }, () => {
      if (this.state.currentWord === sightWord.word) {
        currentWord.answeredCorrectlyCount += 1
        this.props.updateWordScore(currentWord)

        audio.src = winSound
        audio.play()

        this.setState({ showConfetti: true })
        setTimeout(() => {
          this.setState({ showConfetti: false })

          this.selectRandomSightWord()
          this.prompt()
        }, 6000)
      } else {
        currentWord.answeredIncorrectlyCount += 1
        this.props.updateWordScore(currentWord)

        audio.src = loseSound
        audio.play()
      }
    })
  }

  selectRandomSightWord() {
    this.setState({
      currentWord: this.props.sightWords[random(0, this.props.sightWords.length - 1)].word,
    })
  }

  speakText = (text) => {
    const speechUtterance = new SpeechSynthesisUtterance(text)
    speechUtterance.voice = this.state.voices[this.state.currentVoiceIndex]
    speechUtterance.rate = 0.5

    this.state.voiceApi.speak(speechUtterance)
  }

  prompt = (e) => {
    this.speakText(`find the word ${this.state.currentWord}`)
  }

  handleVoiceChange = (index) => {
    this.setState({ currentVoiceIndex: index })
  }

  render() {
    const { sightWords } = this.props
    const { showConfetti, voices } = this.state

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

          <Cell left={1} top={2} height={4} width={3}>
            <RepromptButton onClick={e => this.prompt()}>
              Hear it again <i className="fas fa-volume-up" />
            </RepromptButton>
          </Cell>
        </Grid>

        <Grid columns="repeat(auto-fit, minmax(200px,1fr))">
          {sightWords.map(sightWord => (
            <Cell key={sightWord.sightWordId} height={4} center middle>
              <SightWordSelector
                key={sightWord.sightWordId}
                onClick={e => this.checkIfCorrect(e, sightWord)}
              >
                {sightWord.word}
              </SightWordSelector>
            </Cell>
          ))}
        </Grid>
      </div>
    )
  }
}
