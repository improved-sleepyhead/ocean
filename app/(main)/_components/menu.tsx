"use client";

import { Id } from "@/convex/_generated/dataModel";

import { useUser } from "@clerk/clerk-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef } from "react";
import ExportButton from "./export";

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ({
    documentId
}: MenuProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
            documentId: params.documentId as Id<"documents">,
        });
    const router = useRouter();
    const { user } = useUser();
    const triggerRef = useRef<HTMLButtonElement>(null);

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            loading: "Добавляем в корзину...",
            success: "Заметка помещена в корзину!",
            error: "Не удалось поместить в корзину."
        });
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            triggerRef.current?.blur(); // Убираем фокус с кнопки при закрытии
        }
    };

    return (
        <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                size="sm"
                variant="ghost"
                ref={triggerRef}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <div className="mr-4">
                    <ExportButton initialData={document}/>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-5 w-5 pl-1 mr-2"/>
                    Удалить
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Изменено последний раз пользователем {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-8 w-8"/>
    )
}