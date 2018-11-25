import {syncano} from '@shared/utils/syncano'
import {flow, Instance, types} from 'mobx-state-tree'
import {Value} from 'slate'

const Story = types
  .model('Story', {
    id: types.identifierNumber,
    title: types.string,
    content: types.frozen({}),
  })
  .views(self => ({
    get slateContent() {
      return Value.fromJSON(self.content as any)
    },
  }))

export const StoryStore = types
  .model({
    items: types.optional(types.array(Story), []),
  })
  .actions(self => ({
    create: flow(function* (data: FormData, workspaceId: number) {
      const story = yield syncano('story/create', {
        ...data,
        workspace: workspaceId,
      })

      self.items.push(story)

      return story
    }),
    list: flow(function* (workspaceId: number) {
      const stories = yield syncano('story/list', {
        workspace: workspaceId,
      })

      self.items.replace(stories)
    }),
    find: flow(function* (storyId: number) {
      const story = yield syncano('story/single', {
        story: storyId,
      })

      return Story.create(story)
    }),
  }))

interface StoryStore extends Instance<typeof StoryStore> {}
