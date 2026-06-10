import { useSyncExternalStore } from "react"

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const useOrigin = () => {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!mounted) {
    return ""
  }

  return window.location.origin
}
