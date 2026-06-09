"use client"

import type { Id } from "@/convex/_generated/dataModel"

import { useUser } from "@clerk/clerk-react"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { useMutation, useQuery } from "convex/react"
import { MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRef, useState } from "react"

interface MenuProps {
  documentId: Id<"documents">
}

const ExportButton = dynamic(() => import("./export"), {
  ssr: false,
  loading: () => (
    <div className="px-2 py-1 text-sm text-muted-foreground">
      Загрузка экспорта...
    </div>
  )
})

export const Menu = ({ documentId }: MenuProps) => {
  const params = useParams()
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">
  })
  const { user } = useUser()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({ id: documentId })

    toast.promise(promise, {
      loading: "Добавляем в корзину...",
      success: "Заметка помещена в корзину!",
      error: "Не удалось поместить в корзину."
    })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (!open) {
      triggerRef.current?.blur() // Убираем фокус с кнопки при закрытии
    }
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" ref={triggerRef}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[180px] lg:w-[220px]"
        align="end"
        alignOffset={8}
      >
        {document && isOpen ? (
          <div className="mr-4">
            <ExportButton initialData={document} />
          </div>
        ) : (
          <div className="mr-4 text-sm text-muted-foreground">
            Загрузка документа...
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-5 w-5 pl-1 mr-2" />
          Удалить
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Изменено последний раз пользователем {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-8 w-8" />
}
