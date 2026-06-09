"use client"

import { CoverImageModal } from "@/app/(main)/_components/modals/cover-image-modal"
import { SettingsModal } from "@/app/(main)/_components/modals/settings-modal"
import { useSyncExternalStore } from "react"

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const ModalProvider = () => {
  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  )
}
