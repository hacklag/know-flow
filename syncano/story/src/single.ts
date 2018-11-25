import * as S from '@eyedea/syncano'

interface Args {
  story: string
}

class Endpoint extends S.Endpoint {
  async run(
    {data, users, response, endpoint}: S.Core,
    {args}: S.Context<Args>
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    const {id: user} = this.user
    const storyId = parseInt(args.story, 10)
    const story = await data.story.findOrFail(storyId)

    await endpoint.get('workspace/is-member', {user, workspace: story.workspace})

    return story
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
