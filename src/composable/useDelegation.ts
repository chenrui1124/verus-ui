import { getCurrentScope, onScopeDispose } from 'vue'

export const useDelegation = (() => {
  const enum DelegableEvents {
    Focusin = 'focusin',
    Focusout = 'focusout',
    Keydown = 'keydown',
    Mouseover = 'mouseover',
    Mouseout = 'mouseout'
  }
  const delegable: `${DelegableEvents}`[] = [
    'focusin',
    'focusout',
    'keydown',
    'mouseover',
    'mouseout'
  ]

  const fnm: Map<`${DelegableEvents}`, { controller: AbortController; callbacks: Set<Function> }> =
    new Map()

  function registerListener(availEvt: DelegableEvents) {
    const controller = new AbortController()
    controller.signal.addEventListener('abort', () => fnm.delete(availEvt))

    fnm.set(availEvt, {
      controller,
      callbacks: new Proxy(new Set(), {
        get(target, p, receiver) {
          if (p === 'size') return target.size
          if (p === 'add' && target.size === 0) {
            document.body.addEventListener(
              availEvt,
              e => {
                for (const cb of target) cb(e)
              },
              { signal: controller.signal }
            )
          }
          if (p === 'delete' && target.size === 1) {
            controller.abort()
          }
          return Reflect.get(target, p, receiver).bind(target)
        }
      })
    })
  }

  return (listeners: {
    [T in `${DelegableEvents}`]+?: Parameters<typeof document.body.addEventListener<T>>[1]
  }) => {
    if (!getCurrentScope()) return

    for (const [e, cb] of Object.entries(listeners)) {
      const evt = e as DelegableEvents
      if (!delegable.includes(evt)) continue
      if (!fnm.has(evt)) registerListener(evt)
      fnm.get(evt)!.callbacks.add(cb)
    }

    onScopeDispose(() => {
      for (const [e, cb] of Object.entries(listeners)) {
        const evt = e as DelegableEvents
        if (!fnm.has(evt)) continue
        fnm.get(evt)!.callbacks.delete(cb)
      }
    })
  }
})()
