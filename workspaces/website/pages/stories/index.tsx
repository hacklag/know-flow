import * as Router from '@reach/router'
import {Container, Title} from '@shared/components'
import {Heading, Paragraph} from '@shared/components/typography'
import {Toolbar} from '@website/components/toolbar'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {Button, Pane, Spinner} from 'evergreen-ui'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'
import {NoteItem, NoteList} from './styled'

export interface Props extends WithStore {}

@inject('store')
@observer
class Stories extends React.Component<Props> {
  isPending = observable.box(false)

  async componentDidMount() {
    const {workspace} = this.props.store.workspaceStore

    if (workspace) {
      this.isPending.set(true)
      await this.props.store.storyStore.list(workspace.id)
      this.isPending.set(false)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <TopBar />
        <Toolbar />
        <Container pv="md">
          <Pane display="flex" justifyContent="space-between">
            <Pane display="flex" alignItems="center">
              <Heading size={600}>Notes</Heading>
              {this.isPending.get() && (
                <Spinner size={16} marginLeft="8px" />
              )}
            </Pane>
            <Button
              appearance="primary"
              onClick={() => Router.navigate('/create-note')}
            >Add Note</Button>
          </Pane>
          {this.props.store.storyStore.items.length > 0 && (
            <Pane marginTop={32}>
              <NoteList>
                {this.props.store.storyStore.items.map(item => (
                  <NoteItem to={`/story/${item.id}`}>
                    <Heading size={400}>
                      {item.title}
                    </Heading>
                  </NoteItem>
                ))}
              </NoteList>
            </Pane>
          )}
          {this.props.store.storyStore.items.length === 0 && (
            <Paragraph>
              There are no notes yet
            </Paragraph>
          )}
        </Container>
      </React.Fragment>
    )
  }
}

export default hot(module)(Stories)
