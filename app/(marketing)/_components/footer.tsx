import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return(
    <div className="flex items-center w-full p-6 bg-white z-50">
        <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button className="bg-[#0071AD] px-6 hover:bg-[#16577a]">

            </Button>
        </div>
    </div>
    )
}