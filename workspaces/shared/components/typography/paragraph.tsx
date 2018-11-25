import {getFontFamily, getParagraphStyle, getTextColor} from '@shared/theme/utils'
import styled, {css} from '@shared/utils/styled'
import * as React from 'react'
import {Block, Props as BlockProps} from '../block'

export interface Props extends BlockProps {
  size?: 300 | 400 | 500
  color?: 'muted' | 'default' | 'dark'
  fontFamily?: 'ui' | 'display' | 'mono'
}

const StyledParagraph = styled(Block).attrs({})<Props>`
  ${({
    size = 400,
    fontFamily = 'ui',
    color = 'default',
  }) => css`
    color: ${getTextColor(color)};
    font-family: ${getFontFamily(fontFamily)};
    ${getParagraphStyle(size)}
  `}
`

export default class extends React.PureComponent<Props> {
  render() {
    return (
      <StyledParagraph as="p" {...this.props} />
    )
  }
}
