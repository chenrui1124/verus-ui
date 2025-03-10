import type { ComputedRef, Ref } from 'vue'

import { computed, h, onScopeDispose, reactive } from 'vue'
import { BaseBackdrop } from '@/base'
import { useRender } from '@/composable'

export const useBackdrop = (() => {
  let states: Ref<boolean | undefined>[] | null
  let active: ComputedRef<boolean | undefined> | null

  const dispose = () => {
    if (states && states.length === 0) states = active = null
  }

  return (
    state: Ref<boolean | undefined> | ComputedRef<boolean | undefined>,
    additionalClass?: string
  ) => {
    if (!states) {
      states = reactive([])
      active = computed(() => states!.some(ref => ref.value))
    }
    states.push(state)
    useRender(() => h(BaseBackdrop, { class: additionalClass, state: active!.value }))

    onScopeDispose(() => {
      if (states) {
        states.splice(states.indexOf(state), 1)
        dispose()
      }
    })
  }
})()
