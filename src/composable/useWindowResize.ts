import type { EffectScope } from 'vue'

import { effectScope, getCurrentScope, onScopeDispose } from 'vue'

export const useWindowResize = (() => {
  let subscribers = 0
  let scope: EffectScope | null
  let fns: Set<Function> | null

  const setup = () => addEventListener('resize', () => fns && fns.forEach(fn => fn()))

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      fns = scope = null
    }
  }

  return function (callback: Function) {
    if (!getCurrentScope()) return

    subscribers++
    if (!fns) {
      fns = new Set()
      scope = effectScope(true)
      scope.run(setup)
    }
    fns.add(callback)

    onScopeDispose(() => {
      if (fns instanceof Set) fns.delete(callback)
      dispose()
    })
  }
})()
