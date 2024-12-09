import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const Logo = () => {
    return(
        <div className="hidden md:flex items-center gap-x-0">
            <Image
                src="/logo_light.svg"
                height="60"
                width="60"
                alt="Logo"
                className="dark:hidden"
            />
            <Image
                src="/logo_dark.svg"
                height="60"
                width="60"
                alt="Logo"
                className="hidden dark:block"
            />
        <p className="text-2xl -ml-2 font-semibold font-montserrat text-[#008EDA] dark:text-white">
            cean
        </p>
        </div>
    )
}