import type { MaybeRef } from 'vue'

import { computed, readonly, toRef } from 'vue'

export function useSwitch(options?: {
  modelValue?: MaybeRef<boolean | undefined>
  onSwitch?: (newState: boolean | undefined) => void
}) {
  const stateRef = toRef(options?.modelValue)

  const accState = computed({
    get: () => stateRef.value,
    set: nv => {
      requestAnimationFrame(() => void (stateRef.value = nv))
      options?.onSwitch?.(nv)
    }
  })

  return {
    state: readonly(accState),
    on: () => void (accState.value = true),
    off: () => void (accState.value = false),
    toggle: () => void (accState.value = !accState.value)
  }
}
