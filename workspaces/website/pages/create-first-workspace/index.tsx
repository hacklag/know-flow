import {Container, Title} from '@shared/components'
import {Heading, Paragraph, Text} from '@shared/components/typography'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {Button, Pane, TextInput} from 'evergreen-ui'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

export interface Props extends WithStore {

}

@inject('store')
@observer
class CreateFirstWorkspace extends React.Component<Props> {
  private errors = observable.map()
  private isLoading = observable.box(false)
  private form = this.props.store.formStore.add('create-first-workspace', {
    name: {
      autoFocus: true,
      placeholder: 'Workspace name...',
    },
  })

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Title />
        <TopBar />
        <Container pv="md" ta="center">
          <Heading size={600}>Get Started</Heading>
          <Paragraph mb="md">To get started, create your first workspace.</Paragraph>
          <Pane display="inline-flex" textAlign="left" alignItems="flex-start">
            <TextInput height={40} value={this.form.value('name')} {...this.form.field('name')}/>
            <Button
              height={40}
              type="submit"
              marginLeft="8px"
              isLoading={this.isLoading.get()}
              disabled={!this.allowSubmit}
            >
              {this.isLoading.get() ? 'Creating...' : 'Start'}
            </Button>
          </Pane>
          {this.errors.has('name') && (
            <Pane>
              <Text color="danger">{this.errors.get('name')}</Text>
            </Pane>
          )}
        </Container>
      </form>
    )
  }

  private get allowSubmit(): boolean {
    return this.form.value('name').trim().length >= 1
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      this.isLoading.set(true)
      await this.props.store.workspaceStore.create(this.form.data)
    } catch (err) {
      this.errors.replace(err.response.data)
    } finally {
      this.isLoading.set(false)
    }
  }
}

export default hot(module)(CreateFirstWorkspace)
