import styled from '@shared/utils/styled'
import {Block, Props as BlockProps} from './block'

export interface Props extends BlockProps {
  maxWidth?: 480 | 768 | 960
}

export const Container = styled(Block).attrs({})<Props>`
  max-width: ${({maxWidth = 768}) => maxWidth}px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${_ => _.theme.spacing.sm};
  padding-right: ${_ => _.theme.spacing.sm};
`
