import type { MaybeRef, Ref } from 'vue'

import { computed, readonly, toRef } from 'vue'

export function useSwitch(options?: {
  modelValue?: MaybeRef<boolean | undefined>
  onSwitch?: (newState: boolean | undefined) => void
}): {
  state: Readonly<Ref<boolean>>
  on: () => void
  off: () => void
  toggle: () => void
} {
  const stateRef = toRef(options?.modelValue)
  stateRef.value = !!stateRef.value

  const stateAcc = computed<boolean>({
    get: () => stateRef.value as boolean,
    set: nv => {
      requestAnimationFrame(() => {
        stateRef.value = nv
        options?.onSwitch?.(nv)
      })
    }
  })

  return {
    state: readonly(stateAcc),
    on: () => void (stateAcc.value = true),
    off: () => void (stateAcc.value = false),
    toggle: () => void (stateAcc.value = !stateAcc.value)
  }
}
