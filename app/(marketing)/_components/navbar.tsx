"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";


export const Navbar = () =>{
    const { isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();
    return(
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading &&(
                <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm" className="text-[#0059FF] hover:text-[#0059FF] dark:text-[#ffffff] dark:hover:text-[#cccccc]">
                            Войти
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button size="sm" className="bg-[#0044C2] px-8 hover:bg-[#19489d] dark:bg-white dark:hover:bg-[#cccccc]">
                            Знакомство с Ocean
                        </Button>
                    </SignInButton>
                </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button className="text-[#0059FF] hover:text-[#0059FF] dark:text-[#ffffff] dark:hover:text-[#cccccc]" 
                        variant="ghost" size="sm"  asChild>
                            <Link href="/documents">
                            Перейти в Ocean
                            </Link>
                        </Button>
                        <UserButton />
                    </>
                )}
                <ModeToggle />
            </div>
        </div> 
    )
}