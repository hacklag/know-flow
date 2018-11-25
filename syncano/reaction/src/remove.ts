import * as S from '@eyedea/syncano'

interface Args {
  id: string
}

class Endpoint extends S.Endpoint {
  async run(
    {data, response}: S.Core,
    {args}: S.Context<Args>
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    const reactionId = parseInt(args.id, 10)
    const reaction = await data.reaction.findOrFail(reactionId)

    if (this.user.id !== reaction.author) {
      throw new S.HttpError('Unauthorized', 401)
    }

    return data.reaction.delete(reactionId)
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
