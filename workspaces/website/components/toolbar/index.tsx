import {Container} from '@shared/components'
import {Link} from '@shared/components/typography'
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
export class Toolbar extends React.Component<Props> {
  render() {
    return (
      <Element>
        <Container>
          <Inner>
            <Link to="/">Notes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/company-standards">Company Standards</Link>
          </Inner>
        </Container>
      </Element>
    )
  }
}
