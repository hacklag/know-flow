import {syncano} from '@shared/utils/syncano'
import {flow, Instance, types} from 'mobx-state-tree'

const Workspace = types
  .model('Workspace', {
    id: types.identifierNumber,
    name: types.string,
  })

export const WorkspaceStore = types
  .model({
    items: types.optional(types.array(Workspace), []),
  })
  .actions(self => ({
    create: flow(function* (data: FormData) {
      const workspace = yield syncano('workspace/create', data)

      self.items.push(workspace)
    }),
    list: flow(function* () {
      const items = yield syncano('workspace/list')

      self.items.replace(items)
    }),
  }))
  .views(self => ({
    get workspace() {
      return self.items.length > 0 ? self.items[0] : undefined
    },
    get hasWorkspaces() {
      return self.items.length > 0
    },
  }))

export interface Workspace extends Instance<typeof Workspace> {}
export interface WorkspaceStore extends Instance<typeof WorkspaceStore> {}
