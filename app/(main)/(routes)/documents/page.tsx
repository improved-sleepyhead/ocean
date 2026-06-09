"use client"

import Image from "next/image"
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)
  const router = useRouter()

  const onCreate = async () => {
    const promise = create({ title: "Untitled" }).then(documentId =>
      router.push(`/documents/${documentId}`)
    )

    toast.promise(promise, {
      loading: "Создаём новую заметку...",
      success: "Новая заметка создана!",
      error: "Не удалось создать новую заметку."
    })
  }

  return (
    <div className="h-full flex flex-col items-center lg:mt-[150px] mt-[100px] space-y-5">
      <Image
        src="/default.svg"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/default_dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h1 className="text-lg font-montserrat font-medium">
        {user?.firstName}, добро пожаловать в твой Ocean!
      </h1>
      <Button
        onClick={onCreate}
        className="bg-[#234e79] dark:bg-neutral-200 hover:bg-[#183654] dark:hover:bg-primary/70"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Создать заметку
      </Button>
    </div>
  )
}

export default DocumentsPage
