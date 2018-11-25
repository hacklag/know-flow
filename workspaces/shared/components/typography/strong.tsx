import styled, {css} from '@shared/utils/styled'
import * as React from 'react'
import {default as Text, Props as TextProps} from './text'

export interface Props extends TextProps {
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

const StyledText = styled(Text).attrs({})<Props>`
  ${({
    fontWeight = '600',
  }) => css`
    font-weight: ${fontWeight};
  `}
`

export default class extends React.PureComponent<Props> {
  render() {
    return (
      <StyledText as="span" {...this.props} />
    )
  }
}
