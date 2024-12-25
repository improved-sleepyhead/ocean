"use client";

import { Editor } from "@/components/editor";
import { ToolBar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
};

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update ({
            id: params.documentId,
            content
        });
    };

    if (document === undefined) {
        return (
        <div>
            Загрузка...
        </div>
        );
    }

    if (document === null) {
        return <div>Не найдено</div>
    }

    return ( 
        <div className="pb-40">
            <div className="h-[10vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <ToolBar initialData={document}/>
                <Editor 
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
     );
}
 
export default DocumentIdPage;