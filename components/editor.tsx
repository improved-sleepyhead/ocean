"use client";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
};

export const Editor = ({
    onChange,
    initialContent,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();

    // Создаём редактор с начальным контентом
    const editor = useCreateBlockNote({
        initialContent: 
            initialContent
                ? (JSON.parse(initialContent) as PartialBlock[])
                : undefined,
    });

    // Следим за состоянием документа через эффект
    useEffect(() => {
        if (!editor) return;

        // Обновляем контент при изменении документа
        const content = JSON.stringify(editor.document, null, 2);
        onChange(content);

        // Периодическое обновление, если требуется для других процессов
        const interval = setInterval(() => {
            const updatedContent = JSON.stringify(editor.document, null, 2);
            if (updatedContent !== content) {
                onChange(updatedContent);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [editor, onChange]);

    if (!editor) {
        return <div>Загрузка редактора...</div>;
    }

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    );
};
