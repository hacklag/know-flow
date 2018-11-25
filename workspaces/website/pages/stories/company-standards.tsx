import {Container, Title} from '@shared/components'
import {Heading} from '@shared/components/typography'
import {Toolbar} from '@website/components/toolbar'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

export interface Props extends WithStore {}

@inject('store')
@observer
class CompanyStandard extends React.Component<Props> {
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
          <Heading size={600}>Company Standard</Heading>
        </Container>
      </React.Fragment>
    )
  }
}

export default hot(module)(CompanyStandard)
