import type { Component } from 'vue'

import { createApp } from 'vue'

export function useRender(component: Component) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp(component)
  app.mount(container)

  const destroy = () => {
    app.unmount()
    container.remove()
  }

  return destroy
}
