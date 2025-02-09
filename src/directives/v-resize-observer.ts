import type { ObjectDirective } from 'vue'

type VResizeObserverHostElement = Element & { $$resizeObserver?: ResizeObserver }

type VResizeObserverValue = (entry: ResizeObserverEntry) => void

export const vResizeObserver: ObjectDirective<VResizeObserverHostElement, VResizeObserverValue> = {
  mounted(el, { value }) {
    if (!value) return
    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries.find(entry => entry.target === el)
      if (entry) value(entry)
    })
    el.$$resizeObserver = resizeObserver
    resizeObserver.observe(el)
  },
  unmounted(el, { value }) {
    if (!value) return
    if (el.$$resizeObserver) {
      el.$$resizeObserver.disconnect()
      delete el.$$resizeObserver
    }
  }
}
