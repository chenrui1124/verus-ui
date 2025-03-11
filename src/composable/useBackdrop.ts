import type { ComputedRef, Ref } from 'vue'

import { computed, h, onScopeDispose, reactive, ref } from 'vue'
import { BaseBackdrop } from '@/base'
import { useRender } from '@/composable'

export const useBackdrop = (() => {
  let states: Ref<boolean | undefined>[] | null
  let active: ComputedRef<boolean | undefined> | null
  let className: Ref<string | undefined> | null

  const BackdropWrapper = () => h(BaseBackdrop, { class: className, state: active!.value })

  const dispose = () => {
    if (states && states.length === 0) states = active = className = null
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

    if (additionalClass) {
      if (!className) className = ref()
      className.value = additionalClass
    }

    useRender(BackdropWrapper)

    onScopeDispose(() => {
      if (states) {
        states.splice(states.indexOf(state), 1)
        dispose()
      }
      if (className) className.value = void 0
    })
  }
})()
