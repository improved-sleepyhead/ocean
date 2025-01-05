"use client";

import {
    BlockNoteEditor,
    PartialBlock,
} from "@blocknote/core";

import { useCreateBlockNote } from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    readOnly?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    readOnly
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }

    // Создаём редактор с начальным контентом
    const editor = useCreateBlockNote({
        initialContent: 
            initialContent
                ? (JSON.parse(initialContent) as PartialBlock[])
                : undefined,
        uploadFile: handleUpload,
    });

    // Следим за состоянием документа через эффект
    useEffect(() => {
        if (!editor || readOnly) return; // Отключаем слежение в режиме только для чтения

        const content = JSON.stringify(editor.document, null, 2);
        onChange(content);

        const interval = setInterval(() => {
            const updatedContent = JSON.stringify(editor.document, null, 2);
            if (updatedContent !== content) {
                onChange(updatedContent);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [editor, onChange, readOnly]);


    if (!editor) {
        return <div>Загрузка редактора...</div>;
    }

    return (
        <div
            style={readOnly ? { userSelect: 'text'} : {}}
        >
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                editable={!readOnly}
            />
        </div>
    );
};

export default Editor;
