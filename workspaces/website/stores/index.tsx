import {FormStore} from '@shared/types/form-store'
import {LangStore} from '@shared/types/lang-store'
import {UserStore} from '@shared/types/user-store'
import {Modal} from '@website/stores/modal'
import {Instance, types} from 'mobx-state-tree'
import {hot} from 'react-hot-loader'
import {StoryStore} from './story-store'
import {WorkspaceStore} from './workspace-store'

export const Store = hot(module)(types
  .model('Store', {
    modal: types.optional(Modal, {}),
    langStore: types.optional(LangStore, {}),
    userStore: types.optional(UserStore, {}),
    formStore: types.optional(FormStore, {}),
    workspaceStore: types.optional(WorkspaceStore, {}),
    storyStore: types.optional(StoryStore, {}),
  }))
  .views(self => ({
    get t() {
      return self.langStore.t
    },
  }))

export interface Store extends Instance<typeof Store> {}
