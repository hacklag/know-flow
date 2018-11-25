import {getFontFamily, getTextColor, getTextStyle} from '@shared/theme/utils'
import styled, {css} from '@shared/utils/styled'
import * as React from 'react'
import {Block, Props as BlockProps} from '../block'

export interface Props extends BlockProps {
  size?: 300 | 400 | 500 | 600
  color?: 'muted' | 'default' | 'dark' | 'success' | 'info' | 'danger' | 'warning'
  fontFamily?: 'ui' | 'display' | 'mono'
}

const StyledText = styled(Block).attrs({})<Props>`
  ${({
    size = 400,
    fontFamily = 'ui',
    color = 'default',
  }) => css`
    color: ${getTextColor(color)};
    font-family: ${getFontFamily(fontFamily)};
    ${getTextStyle(size)}
  `}
`

export default class extends React.PureComponent<Props> {
  render() {
    return (
      <StyledText as="span" {...this.props} />
    )
  }
}
