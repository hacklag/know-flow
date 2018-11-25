import * as S from '@eyedea/syncano'

interface Args {
  workspace: string
}

class Endpoint extends S.Endpoint {
  async run(
    {users, response}: S.Core
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    return users.find(this.user.id)
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
