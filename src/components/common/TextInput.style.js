import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import colors from '../../helpers/colors'

export default styled.input`
  padding: 16px 16px;
  width: 100%;
  font-size: 1.5rem;
  border: 1px solid ${colors.lighterPink};
  outline: none;
  background-color: ${colors.pink};

  &:focus {
    border: 1px solid ${colors.pink};
    outline: none;
    background-color: ${tinycolor(colors.pink)
    .lighten(4)
    .toString()};
  }
`
