import type { App, Component } from 'vue'

import { createApp } from 'vue'

interface UseRenderOptions {
  // delay?: number
  mounted?: () => void
  unmounted?: () => void
}

export const useRender = (component: Component, options?: UseRenderOptions) => {
  let count = 0
  let ctr: HTMLDivElement | null = null
  let app: App | null = null

  return {
    inc: () => {
      if (!(ctr || app)) {
        ctr = document.createElement('div')
        document.body.appendChild(ctr)
        app = createApp(component)
        app.mount(ctr)
        options && options.mounted?.()
      }

      count++
    },
    dec: () => {
      if (count > 0) count--

      if (!count) {
        if (app) app.unmount()
        if (ctr) ctr.remove()
        ctr = app = null
        options && options.unmounted?.()
      }
    }
  }
}
