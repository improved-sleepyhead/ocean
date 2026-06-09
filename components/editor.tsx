"use client";

import { useCreateBlockNote } from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import type { PartialBlock } from "@blocknote/core";
import { useCallback, useMemo, useRef } from "react";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    readOnly?: boolean;
};

const parseInitialContent = (initialContent?: string) => {
    if (!initialContent) {
        return undefined;
    }

    try {
        const parsedContent = JSON.parse(initialContent);

        return Array.isArray(parsedContent)
            ? (parsedContent as PartialBlock[])
            : undefined;
    } catch {
        return undefined;
    }
};

const Editor = ({
    onChange,
    initialContent,
    readOnly
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const initialBlocks = useMemo(
        () => parseInitialContent(initialContent),
        [initialContent],
    );

    const lastSavedContentRef = useRef(initialContent ?? "");

    const handleUpload = useCallback(async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    }, [edgestore]);

    const editor = useCreateBlockNote({
        initialContent: initialBlocks,
        uploadFile: handleUpload,
    });

    const handleChange = useCallback(() => {
        if (readOnly) return;

        const updatedContent = JSON.stringify(editor.document);

        if (updatedContent !== lastSavedContentRef.current) {
            lastSavedContentRef.current = updatedContent;
            onChange(updatedContent);
        }
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
                onChange={handleChange}
            />
        </div>
    );
};

export default Editor;
