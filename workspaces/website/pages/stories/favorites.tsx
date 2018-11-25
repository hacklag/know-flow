import {Container, Title} from '@shared/components'
import {Heading} from '@shared/components/typography'
import {Toolbar} from '@website/components/toolbar'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

export interface Props extends WithStore {}

@inject('store')
@observer
class Favorites extends React.Component<Props> {
  isPending = observable.box(false)

  async componentDidMount() {
    const {workspace} = this.props.store.workspaceStore

    if (workspace) {
      this.props.store.storyStore.list(workspace.id)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <TopBar />
        <Toolbar />
        <Container pv="md">
          <Heading size={600}>Favorites</Heading>
        </Container>
      </React.Fragment>
    )
  }
}

export default hot(module)(Favorites)
