import * as S from '@eyedea/syncano'

interface Args {
  title: string
  workspace: string
  content: any
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
    const {workspace} = args

    await endpoint.get('workspace/is-member', {user, workspace})

    return data.story.create({
      title: args.title,
      content: args.content,
      author: this.user.id,
      workspace,
      seenBy: [],
      reactions: [],
    })
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
