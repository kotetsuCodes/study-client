import React from 'react'
import styled from 'styled-components'
import colors from '../../helpers/colors'

const SelectOptionContainer = styled.div`
  ${props => !props.isVisible && 'display: none;'};
  position: absolute;
`

const SelectOption = styled.div`
  transition: background-color 0.5s ease;
  background-color: ${props => (props.isSelected ? colors.pink : colors.green)};
  cursor: pointer;
  padding: 8px 8px;
  width: 400px;
  &:hover {
    background-color: #57b28f;
  }
`

const CurrentOptionDisplay = styled.div`
  background-color: ${colors.green};
  cursor: pointer;
  width: 400px;
  outline: none;
  padding: 8px 8px;
  border: 1px solid #287759;
`

const SelectOptionIcon = styled.i`
  float: right;
`

export default class SelectDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      selectOptions: props.selectOptions,
    }
  }

  componentWillMount() {
    document.body.addEventListener('click', this.hideSelect)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideSelect)
  }

  handleSelectChange = (inOption, index) => {
    this.setState({
      isVisible: false,
      selectOptions: this.state.selectOptions.map((option) => {
        if (option.value === inOption.value) {
          option.isSelected = true
        } else {
          option.isSelected = false
        }

        return option
      }),
    })

    this.props.onSelect(index)
  }

  handleVisibleChange = (e) => {
    e.stopPropagation()
    if (!this.state.isVisible) {
      console.log('not visible, changing to visible')
      this.setState({ isVisible: true })
    }
  }

  hideSelect = () => {
    console.log('hiding select')
    this.setState({ isVisible: false })
  }

  render() {
    const { selectOptions, isVisible } = this.state
    const currentlySelected = selectOptions.find(so => so.isSelected)
    return (
      <div>
        {currentlySelected ? (
          <CurrentOptionDisplay onClick={e => this.handleVisibleChange(e)}>
            {currentlySelected.displayName}
            <SelectOptionIcon className="fas fa-caret-down" />
          </CurrentOptionDisplay>
        ) : (
            <CurrentOptionDisplay>None</CurrentOptionDisplay>
          )}
        <SelectOptionContainer tabIndex={-1} isVisible={isVisible}>
          {selectOptions.map((option, index) => (
            <SelectOption
              key={option.value}
              onClick={e => this.handleSelectChange(option, index)}
              isSelected={option.isSelected}
            >
              {option.displayName}
            </SelectOption>
          ))}
        </SelectOptionContainer>
      </div>
    )
  }
}
