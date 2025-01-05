"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/error_light.svg"
                height="200"
                width="200"
                alt="Error"
                className="dark:hidden"
            />
            <Image
                src="/error_dark.svg"
                height="200"
                width="200"
                alt="Error"
                className="hidden dark:block"
            />
            <h2 className="text-xl font-medium">
                Что-то пошло не так!
            </h2>
            <Button asChild>
                <Link href="/documents">
                    Вернуться назад
                </Link>
            </Button>
        </div>
     );
}
 
export default Error;