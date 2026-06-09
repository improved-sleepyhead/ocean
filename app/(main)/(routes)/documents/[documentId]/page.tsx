"use client"

import { Cover } from "@/components/cover"
import { ToolBar } from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useCallback, useEffect } from "react"

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">
  }
}

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <div className="px-[54px] py-4 text-sm text-muted-foreground">
      Загрузка редактора...
    </div>
  )
})

const preloadEditor = () => {
  void import("@/components/editor")
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  useEffect(() => {
    preloadEditor()
  }, [])

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  })

  const update = useMutation(api.documents.update)

  const onChange = useCallback(
    (content: string) => {
      update({
        id: params.documentId,
        content
      })
    },
    [params.documentId, update]
  )

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) {
    return <div>Не найдено</div>
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar initialData={document} />
        <Editor
          key={params.documentId}
          onChange={onChange}
          initialContent={document.content}
          readOnly={false}
        />
      </div>
    </div>
  )
}

export default DocumentIdPage
