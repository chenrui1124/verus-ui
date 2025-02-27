import { onMounted, onUnmounted } from 'vue'

function useResizeCreator() {
  const run = () => {
    for (const cb of cbs) cb()
  }

  const cbs = new Proxy(new Set<Function>(), {
    get(target, prop, receiver) {
      if (prop === 'size') return target.size
      if (prop === 'add' && target.size === 0) window.addEventListener('resize', run)
      if (prop === 'delete' && target.size === 1) window.removeEventListener('resize', run)
      return Reflect.get(target, prop, receiver).bind(target)
    }
  })

  return (callback: Function) => {
    onMounted(() => cbs.add(callback))
    onUnmounted(() => cbs.delete(callback))
  }
}

export const useResize = useResizeCreator()
