import * as S from '@eyedea/syncano'

interface Args {
  user: string
  workspace: string
}

class Endpoint extends S.Endpoint {
  async run(
    {data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const userId = parseInt(args.user, 10)
    const workspaceId = parseInt(args.workspace, 10)

    const {members = []} = await data.workspace.findOrFail(workspaceId)

    if (!members.includes(userId)) {
      throw new S.HttpError('Unauthorized', 401)
    }
  }

  endpointDidCatch({message, statusCode}: S.HttpError) {
    this.syncano.response.json({message}, statusCode || 400)
  }
}

export default (ctx: S.Context<Args>) => new Endpoint(ctx)
