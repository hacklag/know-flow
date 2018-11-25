import {Redirect, Router} from '@reach/router'
import {Title} from '@shared/components'
import {loadable} from '@shared/utils/loadable'
import {TopBar} from '@website/components/top-bar'
import {WithStore} from '@website/types'
import {as} from '@website/utils/as'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import * as React from 'react'
import {hot} from 'react-hot-loader'

const CreateFirstWorkspace = loadable(() => import('@website/pages/create-first-workspace'))
const Stories = loadable(() => import('@website/pages/stories'))
const Favorites = loadable(() => import('@website/pages/stories/favorites'))
const CompanyStandards = loadable(() => import('@website/pages/stories/company-standards'))
const Missing = loadable(() => import('@website/pages/missing'))
const CreateNote = loadable(() => import('@website/pages/create-note'))
const Story = loadable(() => import('@website/pages/story'))

@hot(module)
@inject('store')
@as.guest(() => <Redirect to="/auth/login" noThrow />)
@observer
class Dashboard extends React.Component<WithStore> {
  isPending = observable.box(false)

  async componentDidMount() {
    this.isPending.set(true)
    await this.props.store.workspaceStore.list()
    this.isPending.set(false)
  }

  render() {
    if (this.isPending.get()) {
      return (
        <div>
          <Title />
          <TopBar />
        </div>
      )
    }

    const {hasWorkspaces} = this.props.store.workspaceStore

    return (
      <Router>
        {hasWorkspaces ? (
          <Stories path="/" />
        ) : (
          <CreateFirstWorkspace path="/" />
        )}
        <Favorites path="/favorites" />
        <CompanyStandards path="/company-standards" />
        <CreateNote path="/create-note" />
        <Story path="/story/:id" />
        <Missing default />
      </Router>
    )
  }
}

export default Dashboard
