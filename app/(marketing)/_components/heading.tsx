"use client";


import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-8xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-montserrat text-[#0059FF]">
                <span className="dark:text-white">Твое цифровое пространство <br />для идей, проектов и продуктивности. <br />Добро пожаловать в </span>
                <span className="bg-gradient-to-r from-[#0059FF] to-[#00DDFF] inline-block text-transparent bg-clip-text font-montserrat  dark:bg-gradient-to-r dark:from-[#640F00] dark:to-[#BC0003]">Ocean!</span >
            </h1>
            <h3 className="text-base dark:text-white sm:text-xl md:text-2xl font-medium font-montserrat text-[#0059FF]">
                Ведите личные записи, планируйте проекты<br />
                и совместно работайте с командой - всё в одном месте
            </h3>
            <Button className="bg-[#0044C2] px-8 hover:bg-[#19489d] dark:bg-white dark:hover:bg-[#cccccc]">
            <h3 className="text-base font-medium font-montserrat">Начните бесплатно</h3>
            <ArrowRight className="h-6 w-6 ml-4"/>
            </Button>
        </div>
    )
}