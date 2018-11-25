import styled from '@shared/utils/styled'

export const Element = styled.div`
  background: #fff;
  padding: ${_ => _.theme.spacing.xs} 0;
  border-bottom: 1px solid ${_ => _.theme.colors.ui.hex};
`

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`
