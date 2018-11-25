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
    const workspaceId = parseInt(workspace, 10)

    await endpoint('workspace/is-member', {user, workspace})

    return data.workspace.findOrFail(workspaceId)
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
