"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"

import { useSearch } from "@/hooks/use-search"
import { ModeToggle } from "@/components/mode-toggle"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/hooks/use-settings"

export const SettingsModal = () => {
    const settings = useSettings();

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="rext-lg font-medium">
                        Мои настройки
                    </h2>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <label>
                            Внешний вид
                        </label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Выбери, как будет выглядеть Ocean на твоём девайсе
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};
