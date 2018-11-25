import {getHeadingStyle} from '@shared/theme/utils'
import styled, {css} from '@shared/utils/styled'
import * as React from 'react'
import {Block, Props as BlockProps} from '../block'

export interface Props extends BlockProps {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontFamily?: 'ui' | 'display' | 'mono'
}

const StyledHeading = styled(Block).attrs({})<Props>`
  ${({
    size = 500,
  }) => css`
    ${getHeadingStyle(size)}
  `}
`

export default class extends React.PureComponent<Props> {
  render() {
    return (
      <StyledHeading as="h2" {...this.props} />
    )
  }
}
