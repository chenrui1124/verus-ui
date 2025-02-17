import { onMounted, onUnmounted } from 'vue'

export const useResize = (() => {
  const cbSet = new Set<Function>()
  let controller: AbortController | null = null

  return (callback: Function) => {
    onMounted(() => {
      cbSet.add(callback)
      if (cbSet.size === 1) {
        controller = new AbortController()
        window.addEventListener(
          'resize',
          () => {
            for (const cb of cbSet) cb()
          },
          { signal: controller.signal }
        )
      }
    })
    onUnmounted(() => {
      cbSet.delete(callback)
      if (cbSet.size === 0) {
        controller?.abort()
        controller = null
      }
    })
  }
})()
