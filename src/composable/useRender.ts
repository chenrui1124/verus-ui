import type { App, Component } from 'vue'

import { createApp, onMounted, onUnmounted } from 'vue'

export function useRender(component: Component) {
  let count = 0
  let ctr: HTMLDivElement | null = null
  let app: App | null = null

  onMounted(() => {
    if (!(ctr || app)) {
      ctr = document.createElement('div')
      document.body.appendChild(ctr)
      app = createApp(component)
      app.mount(ctr)
    }

    count++
  })

  onUnmounted(() => {
    if (count > 0) count--

    if (!count) {
      if (app) app.unmount()
      if (ctr) ctr.remove()
      ctr = app = null
    }
  })
}
