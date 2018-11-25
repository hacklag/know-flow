import {Link} from '@shared/components/typography'
import {colors} from '@shared/theme/foundational-styles'
import styled from '@shared/utils/styled'

export const NoteList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`

export const NoteItem = styled(Link)`
  padding: 16px;
  display: block;
  border: 1px solid ${colors.border.default};
  border-radius: 4px;

  &:hover {
    background-color: ${colors.background.tint1};
    text-decoration: none;
  }

  & + * {
    /* border-top: 1px solid ${colors.border.default}; */
  }
`
