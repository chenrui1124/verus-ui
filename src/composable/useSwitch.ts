import type { MaybeRef } from 'vue'

import { readonly, ref } from 'vue'

export function useSwitch(init: MaybeRef<boolean | undefined> = void 0) {
  const _state = typeof init === 'object' && 'value' in init ? init : ref(init)

  return {
    state: readonly(_state),
    on: () => void requestAnimationFrame(() => void (_state.value = true)),
    off: () => void requestAnimationFrame(() => void (_state.value = false)),
    toggle: () => void requestAnimationFrame(() => void (_state.value = !_state.value))
  }
}
