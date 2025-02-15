import type { Ref } from 'vue'

import { computed, h, shallowReactive, Transition } from 'vue'
import { useRender } from './useRender'

export const useBackdrop = (() => {
  const refList = shallowReactive<Ref<boolean | undefined>[]>([])

  const active = computed(() => refList.some(ref => ref.value))

  const backdrop = h('div', {
    class:
      'pointer-events-none fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition duration-500'
  })

  return (ref: Ref<boolean | undefined>) => {
    useRender(() =>
      h(
        Transition,
        {
          enterFromClass: 'opacity-0',
          leaveToClass: 'opacity-0'
        },
        () => (active.value ? backdrop : void 0)
      )
    )

    refList.push(ref)
  }
})()
