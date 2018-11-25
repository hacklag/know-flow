import {Link as RouterLink} from '@reach/router'
import {getFontFamily, getTextColor, getTextStyle} from '@shared/theme/utils'
import styled, {css} from '@shared/utils/styled'
import {ROUTER_BASEPATH} from '@website/config'
import * as React from 'react'
import {Block, Props as BlockProps} from '../block'

export interface Props extends BlockProps {
  children: any
  to: string
  size?: 300 | 400 | 500
  color?: 'default' | 'green' | 'blue' | 'neutral' | 'dark' | 'muted'
  fontFamily?: 'ui' | 'display' | 'mono'
}

const StyledLink = styled(Block).attrs({})<Props>`
  &:hover {
    text-decoration: underline;
  }

  ${({
    size = 400,
    fontFamily = 'ui',
    color = 'default',
  }) => css`
    ${getTextStyle(size)};
    font-family: ${getFontFamily(fontFamily)};
    text-decoration: ${`none`};
    display: ${`inline-block`};
    color: ${getTextColor(color)};
  `}
`

export default class extends React.PureComponent<Props> {
  render() {
    const to = this.props.to
      ? `${ROUTER_BASEPATH}/${this.props.to.replace(/^\//, '')}`
      : this.props.to

    return (
      <StyledLink
        as={to ? RouterLink : 'a'}
        to={to}
        {...this.props}
      />
    )
  }
}
