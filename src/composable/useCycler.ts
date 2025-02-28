import type { MaybeReadonly } from 'mm2r'

import { computed, ref } from 'vue'

export function useCycler<T extends MaybeReadonly<any[]> | string | number>(
  items: T,
  start: number = 0
) {
  const length = typeof items === 'number' ? Math.floor(items) + 1 : items.length

  const index = ref(Math.min(Math.max(Math.floor(start), 0), length - 1))

  const item = computed(() => (typeof items === 'number' ? index.value : items[index.value]))

  return {
    item,
    index,
    prev() {
      requestAnimationFrame(() => {
        index.value = (index.value - 2 + length) % (length - 1)
      })
    },
    next() {
      requestAnimationFrame(() => {
        index.value = (index.value + 1) % (length - 1)
      })
    }
  }
}
