"use client";

import {
    BlockNoteEditor,
    PartialBlock,
} from "@blocknote/core";

import {
    BlockNoteViewRaw,
    useCreateBlockNote,
    useBlockNoteEditor,
} from "@blocknote/react";

import "@blocknote/core/style.css";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

export const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    // const editor: BlockNoteEditor = useCreateBlockNote({
    //     editable,
    //     initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    //     onEditorContentChange: (editor: BlockNoteEditor) => {
    //         onChange(JSON.stringify(editor.document, null, 2));
    //     }
    // })

    return (
        <div>
            Editor
        </div>
    )
}

