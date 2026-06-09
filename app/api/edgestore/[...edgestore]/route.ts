import { initEdgeStore } from "@edgestore/server"
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app"
import type { NextRequest } from "next/server"

const createEdgeStoreRouter = () => {
  const es = initEdgeStore.create()

  return es.router({
    publicFiles: es.fileBucket().beforeDelete(() => {
      return true
    })
  })
}

const handler = (request: NextRequest) => {
  return createEdgeStoreNextHandler({
    router: createEdgeStoreRouter()
  })(request)
}

export { handler as GET, handler as POST }

export type EdgeStoreRouter = ReturnType<typeof createEdgeStoreRouter>
