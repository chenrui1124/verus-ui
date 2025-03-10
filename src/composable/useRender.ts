import type { App, Component, EffectScope } from 'vue'

import {
  createApp,
  defineComponent,
  effectScope,
  getCurrentScope,
  h,
  onScopeDispose,
  reactive
} from 'vue'

export const useRender = (() => {
  let subscribers = 0
  let scope: EffectScope | null
  let comps: Component[] | null
  let ctr: HTMLElement | null
  let app: App | null

  const setup = () => {
    document.body.appendChild((ctr = document.createElement('div')))
    app = createApp(defineComponent(() => () => (comps ? comps.map(comp => h(comp)) : null)))
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

  return function (comp: Component) {
    if (!getCurrentScope()) return

    subscribers++
    if (!Array.isArray(comps)) {
      comps = reactive([])
      scope = effectScope(true)
      scope.run(setup)
    }
    comps.push(comp)

    onScopeDispose(() => {
      if (Array.isArray(comps)) comps.splice(comps.indexOf(comp), 1)
      dispose()
    })
  }
})()
