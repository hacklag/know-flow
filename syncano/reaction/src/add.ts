import * as S from '@eyedea/syncano'

interface Args {
  type: string
  story: string
}

class Endpoint extends S.Endpoint {
  async run(
    {data, response, endpoint}: S.Core,
    {args}: S.Context<Args>
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    const {id: user} = this.user
    const storyId = parseInt(args.story, 10)
    const story = await data.story.findOrFail(storyId)

    await endpoint('workspace/is-member', {user, workspace: story.workspace})

    return data.reaction.create({
      type: args.type,
      author: this.user.id,
    })
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
