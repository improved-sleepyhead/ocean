"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth(); 


    return (
        <div className="max-w-8xl space-y-4 mb-[250px] sm:mb-15 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-montserrat text-[#0059FF]">
                <span className="dark:text-white">Твое цифровое пространство <br />для идей, проектов и продуктивности. <br />Добро пожаловать в </span>
                <span className="bg-gradient-to-r from-[#0059FF] to-[#00DDFF] inline-block text-transparent bg-clip-text font-montserrat  dark:bg-gradient-to-r dark:from-[#640F00] dark:to-[#BC0003]">Ocean!</span >
            </h1>
            <h3 className="text-base dark:text-white sm:text-xl md:text-2xl font-medium font-montserrat text-[#0059FF]">
                Ведите личные записи, планируйте проекты<br />
                и совместно работайте с командой - всё в одном месте
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
            <Button asChild
            className="bg-[#0044C2] px-8 hover:bg-[#19489d]
            dark:bg-white dark:hover:bg-[#cccccc]">
                <Link href="/documents">
                <h3 className="text-base font-medium font-montserrat">Перейти в Ocean</h3>
                <ArrowRight className="h-6 w-6 ml-4"/>
                </Link>
            </Button>
            )}
            {!isAuthenticated && !isLoading &&(
                    <SignInButton>
                        <Button
                        className="bg-[#0044C2] px-8 hover:bg-[#19489d]
                        dark:bg-white dark:hover:bg-[#cccccc]">
                            <h3 className="text-base font-medium font-montserrat">Начните бесплатно</h3>
                            <ArrowRight className="h-6 w-6 ml-4"/>
                        </Button>
                    </SignInButton>
            )} 
        </div>
    )
}