import * as S from '@eyedea/syncano'

class Endpoint extends S.Endpoint {
  async run(
    {data, response}: S.Core
  ) {
    if (this.user === undefined) {
      return response.json({message: 'Unauthorized'}, 401)
    }

    return data.workspace.where('author', this.user.id).list()
  }
}

export default (ctx: S.Context) => new Endpoint(ctx)
