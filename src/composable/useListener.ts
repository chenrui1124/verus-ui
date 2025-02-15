import { onMounted, onUnmounted } from 'vue'

type AvailableEvents = 'keyup' | 'resize' | 'pointerover' | 'pointerout'

export const useListener = (() => {
  const AVAIL_EVT: AvailableEvents[] = ['keyup', 'pointerover', 'pointerout', 'resize'] as const

  const fxMap = new Map<
    AvailableEvents,
    { cbs: Set<Function>; readyState: boolean; abortController: AbortController }
  >()

  const fxMapAdd = (evt: string, cb: Function) => {
    if (!AVAIL_EVT.includes(evt as AvailableEvents)) return
    const ae = evt as AvailableEvents
    if (!fxMap.has(ae)) {
      fxMap.set(ae, {
        cbs: new Set(),
        readyState: false,
        abortController: new AbortController()
      })
    }
    if (!fxMap.get(ae)!.cbs.has(cb)) fxMap.get(ae)!.cbs.add(cb)
    if (!fxMap.get(ae)!.readyState) {
      document.body.addEventListener(ae, evt => fxMap.get(ae)!.cbs.forEach(cb => cb(evt)), {
        signal: fxMap.get(ae)!.abortController.signal
      })
      fxMap.get(ae)!.readyState = true
    }
  }

  const fxMapDel = (evt: string, cb: Function) => {
    if (!AVAIL_EVT.includes(evt as AvailableEvents)) return
    const ae = evt as AvailableEvents
    if (!fxMap.has(ae)) return
    fxMap.get(ae)?.cbs.delete(cb)
    if (fxMap.get(ae)?.readyState && fxMap.get(ae)?.cbs.size === 0) {
      fxMap.get(ae)!.abortController.abort()
      fxMap.delete(ae)
    }
  }

  return (fxs: { [E in AvailableEvents]?: Parameters<typeof document.addEventListener<E>>[1] }) => {
    onMounted(() => {
      for (const [evt, cb] of Object.entries(fxs)) fxMapAdd(evt, cb)
    })
    onUnmounted(() => {
      for (const [evt, cb] of Object.entries(fxs)) fxMapDel(evt, cb)
    })
  }
})()
