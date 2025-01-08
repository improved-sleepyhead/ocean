"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "./modals/confirm-modal";


interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({
    documentId
}: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);
    
    const onRemove = () => {
        const promise = remove({ id: documentId })
        toast.promise(promise, {
            loading: "Удаляем заметку...",
            success: "Заметка успешно удалена!",
            error: "Не удалось удалить заметку"
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Восстанавливаем заметку...",
            success: "Заметка успешно восстановлена!",
            error: "Не удалось восстановить заметку"
        });
    };

    return (
        <div className="w-full bg-rose-500 text-center text-xs lg:text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                Эта страница находится в корзине
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent hover:bg-[#aa343484] text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Восстановить страницу
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-[#aa343484] text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Удалить навсегда
                </Button>
            </ConfirmModal>
        </div>
    )
}