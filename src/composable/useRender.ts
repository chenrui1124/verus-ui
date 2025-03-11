import type { App, Component, EffectScope, ShallowReactive } from 'vue'

import { createApp, effectScope, getCurrentScope, h, onScopeDispose, shallowReactive } from 'vue'

export const useRender = (() => {
  let subscribers = 0
  let scope: EffectScope | null
  let comps: ShallowReactive<Map<Component, { subs: number }>> | null
  let ctr: HTMLElement | null
  let app: App | null

  const handleMap = (map: typeof comps) => {
    if (!map) return []

    const rendered = []

    for (const comp of map.keys()) {
      rendered.push(h(comp))
    }

    return rendered
  }

  const setup = () => {
    document.body.appendChild((ctr = document.createElement('div')))
    app = createApp({
      render: () => handleMap(comps)
    })
    app.config.idPrefix = 'single'
    app.mount(ctr)
  }

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      app?.unmount()
      ctr?.remove()
      app = ctr = comps = scope = null
    }
  }

  return (comp: Component) => {
    if (!getCurrentScope()) return

    subscribers++

    if (!comps) {
      comps = shallowReactive(new Map())
      scope = effectScope(true)
      scope.run(setup)
    }

    if (!comps.has(comp)) comps.set(comp, { subs: 1 })

    onScopeDispose(() => {
      if (comps && comps.has(comp)) {
        const info = comps.get(comp)!
        if (--info.subs <= 0) comps.delete(comp)
      }

      dispose()
    })
  }
})()
