import {Container} from '@shared/components'
import {Link, Strong} from '@shared/components/typography'
import {Store} from '@website/stores'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {Element, Inner} from './styled'

export interface Props {
  store?: Store
}

@inject('store')
@hot(module)
@observer
export class TopBar extends React.Component<Props> {
  render() {
    return (
      <Element>
        <Container>
          <Inner>
            <Link to="/" color="dark">
              <Strong>KnowFlow</Strong>
            </Link>
            <Link to="/auth/logout">Logout</Link>
          </Inner>
        </Container>
      </Element>
    )
  }
}
