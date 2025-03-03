import { onMounted, onUnmounted } from 'vue'

function useDelegationCreator() {
  const availEvents = ['focusin', 'focusout', 'keydown', 'mouseover', 'mouseout'] as const

  type AvailableEvents = (typeof availEvents)[number]

  type ListenerMap = Map<
    AvailableEvents,
    { abortController: AbortController; callbacks: Set<Function> }
  >

  const listenerMap: ListenerMap = new Map()

  function registerListener(availEvt: AvailableEvents) {
    const abortController = new AbortController()
    abortController.signal.addEventListener('abort', () => listenerMap.delete(availEvt))

    listenerMap.set(availEvt, {
      abortController,
      callbacks: new Proxy(new Set(), {
        get(target, p, receiver) {
          if (p === 'size') return target.size
          if (p === 'add' && target.size === 0) {
            document.body.addEventListener(
              availEvt,
              e => {
                for (const cb of target) cb(e)
              },
              { signal: abortController.signal }
            )
          }
          if (p === 'delete' && target.size === 1) {
            abortController.abort()
          }
          return Reflect.get(target, p, receiver).bind(target)
        }
      })
    })
  }

  return (listeners: {
    [T in AvailableEvents]+?: Parameters<typeof document.body.addEventListener<T>>[1]
  }) => {
    onMounted(() => {
      for (const [e, cb] of Object.entries(listeners)) {
        const evt = e as AvailableEvents
        if (!listenerMap.has(evt)) registerListener(evt)
        listenerMap.get(evt)!.callbacks.add(cb)
      }
    })

    onUnmounted(() => {
      for (const [e, cb] of Object.entries(listeners)) {
        const evt = e as AvailableEvents
        if (!listenerMap.has(evt)) continue
        listenerMap.get(evt)!.callbacks.delete(cb)
      }
    })
  }
}

export const useDelegation = useDelegationCreator()
