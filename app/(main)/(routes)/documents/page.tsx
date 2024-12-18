"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
    const { user } = useUser();

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-5">
            <Image
                src="/default.svg"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image
                src="/default_dark.svg"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />
            <h1 className="text-lg font-montserrat font-medium">
                {user?.firstName}, добро пожаловать в твой Ocean!
            </h1>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Создать заметку
            </Button>
        </div>
    );
}
 
export default DocumentsPage;