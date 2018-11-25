import * as S from '@eyedea/syncano'

interface Args {
  name: string
}

class Endpoint extends S.Endpoint {
  async run(
    {data, response}: S.Core,
    {args}: S.Context<Args>
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    return data.workspace.create({
      name: args.name,
      author: this.user.id,
      members: [this.user.id],
    })
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
