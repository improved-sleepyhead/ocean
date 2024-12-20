"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "./modals/confirm-modal";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Восстанавливаем заметку...",
            success: "Заметка восстановлена!",
            error: "Не удалось восстановить заметку.",
        });
    };
    
    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Удаляем заметку...",
            success: "Заметка удалена!",
            error: "Не удалось удалить заметку.",
        });

        if (params.documentId === documentId) {
            router.push("/documents")
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg"/>
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input 
                    value={search}
                    onChange = {(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Фильтр по названию страницы..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs 
                text-center text-muted-foreground pb-2">
                    Документов не найдено
                </p>
                {filteredDocuments?.map((document) =>(
                    <div
                    key={document._id}
                    role="button"
                    onClick={() => onClick(document._id)}
                    className="text-sm rounded-sm w-full hover:bg-primary/5 flex
                    items-center text-primary justify-between"
                    >
                        <span className="truncate items-center">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div
                            onClick={(e) => onRestore(e, document._id)}
                            role="button"
                            className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id)}>
                            <div
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                                <Trash className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};