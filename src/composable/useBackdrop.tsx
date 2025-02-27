import type { Ref } from 'vue'

import { computed, shallowReactive, Transition } from 'vue'
import { BaseBackdrop } from '@/base'
import { useRender } from '@/composable'

function useBackdropCreator() {
  const stateList = shallowReactive<Ref<boolean | undefined>[]>([])

  const active = computed(() => stateList.some(ref => ref.value))

  return ({ state, className }: { state: Ref<boolean | undefined>; className?: string }) => {
    useRender(() => (
      <Transition enterFromClass='opacity-0' leaveToClass='opacity-0'>
        {active.value && <BaseBackdrop class={className} />}
      </Transition>
    ))

    stateList.push(state)
  }
}

export const useBackdrop = useBackdropCreator()
