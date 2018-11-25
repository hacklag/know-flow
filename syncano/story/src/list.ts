import * as S from '@eyedea/syncano'

interface Args {
  workspace: string
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

    return data.story.where('workspace', workspace).list()
  }

  endpointDidCatch({message, statusCode}: S.HttpError) {
    this.syncano.response.json({message}, statusCode || 400)
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
