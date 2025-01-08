"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import { Button } from "@/components/ui/button";
import { FilePlus2, ImageIcon, Smile, X } from "lucide-react";
import { ComponentRef, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import TextAreaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";



interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
};

export const ToolBar = ({
    initialData,
    preview
}: ToolbarProps) => {
    const inputRef = useRef<ComponentRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
        setIsMenuOpen(false);
    };

    const onCoverImageOpen = () => {
        coverImage.onOpen();
        setIsMenuOpen(false); // Закрыть меню после открытия обложки
    };

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id
        })
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const onMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}

            

            <div className="hidden lg:block">
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                    {!initialData.icon && !preview && (
                        <IconPicker asChild onChange={onIconSelect}>
                            <Button
                                className="text-muted-foreground text-xs"
                                variant="outline"
                                size="sm"
                            >
                                <Smile className="h-4 w-4 mr-2"/>
                                Добавить иконку
                            </Button>
                        </IconPicker>
                    )}
                    {!initialData.coverImage && !preview && (
                        <Button
                        onClick={coverImage.onOpen}
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <ImageIcon className="h-4 w-4 mr-2"/>
                            Добавить обложку
                        </Button>
                    )}
                </div>
            </div>

                {isEditing && !preview ? (
                    <TextAreaAutosize 
                        ref={inputRef}
                        onBlur={disableInput}
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={(e) => onInput(e.target.value)}
                        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                    />
                ) : (
                    <div className="flex py-4">
                        <div
                            onClick={enableInput}
                            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                        >
                            {initialData.title}
                            
                        </div>
                        <div className="lg:hidden ml-[7px] mt-[5px]">
                        <Button
                            ref={buttonRef}
                            onClick={onMenu}
                            className="text-muted-foreground text-xs hover:bg-transparent"
                            variant="ghost"
                            size="sm"
                        >
                            <FilePlus2 className="h-6 w-6"/>
                        </Button>

                        {isMenuOpen && (
                            <div
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4"

                            style={{
                                transform: 'translateX(-180px)',
                            }}
                            >
                                {!initialData.icon && !preview && (
                                    <IconPicker asChild onChange={onIconSelect}>
                                        <Button
                                            className="text-muted-foreground text-xs"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Smile className="h-4 w-4 mr-2"/>
                                            Добавить иконку
                                        </Button>
                                    </IconPicker>
                                )}
                                {!initialData.coverImage && !preview && (
                                    <Button
                                        onClick={onCoverImageOpen}
                                        className="text-muted-foreground text-xs"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <ImageIcon className="h-4 w-4 mr-2"/>
                                        Добавить обложку
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>   
            )}
        </div>
            
            
    )
}