import {colors} from '@shared/theme/foundational-styles'
import styled from '@shared/utils/styled'

export const Element = styled.div`
  background: #fff;
  padding: ${_ => _.theme.spacing.xs} 0;
  border-bottom: 1px solid ${_ => _.theme.colors.ui.hex};
  background-color: ${colors.background.blueTint};
`

export const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  * + * {
    margin-left: ${_ => _.theme.spacing.xs};
  }
`
