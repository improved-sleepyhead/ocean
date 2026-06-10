"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { ModeToggle } from "@/components/mode-toggle"
import { useSettings } from "@/hooks/use-settings"

export const SettingsModal = () => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-medium">
            Мои настройки
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <label>Внешний вид</label>
            <DialogDescription className="text-[0.8rem]">
              Выбери, как будет выглядеть Ocean на твоём девайсе
            </DialogDescription>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}
