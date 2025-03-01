import type { App, Component } from 'vue'

import { createApp, onMounted, onUnmounted } from 'vue'

interface RenderedComponentInfo {
  container: HTMLDivElement
  instance: App
  count: number
}

function useRenderCreator() {
  const comps = new WeakMap<Component, RenderedComponentInfo>()

  function register(comp: Component) {
    const info = comps.get(comp)

    if (info) {
      info.count++
    } else {
      const container = document.createElement('div')
      document.body.appendChild(container)
      const instance = createApp(comp)
      comps.set(comp, { container, instance, count: 1 })
      instance.mount(container)
    }
  }

  function unregister(comp: Component) {
    const info = comps.get(comp)

    if (info) {
      info.count--
      if (info.count <= 0) {
        info.instance.unmount()
        info.container.remove()
        comps.delete(comp)
      }
    }
  }

  return (component: Component) => {
    onMounted(() => register(component))

    onUnmounted(() => unregister(component))
  }
}

export const useRender = useRenderCreator()
