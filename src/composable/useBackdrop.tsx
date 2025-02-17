import type { FunctionalComponent, Ref } from 'vue'

import { computed, shallowReactive, Transition } from 'vue'
import { useRender } from '@/composable'
import { cn } from '@/utils'

/**
 * @param state bind a ref, the backdrop will be displayed when the ref value is true.
 */
export const useBackdrop = (() => {
  const stateList = shallowReactive<Ref<boolean | undefined>[]>([])

  const active = computed(() => stateList.some(ref => ref.value))

  const Backdrop: FunctionalComponent<{ className?: string }> = ({ className }) => (
    <div
      class={cn(
        'pointer-events-none fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition duration-500',
        className
      )}
    ></div>
  )

  return ({ state, className }: { state: Ref<boolean | undefined>; className?: string }) => {
    useRender(() => (
      <Transition enterFromClass='opacity-0' leaveToClass='opacity-0'>
        {active.value && <Backdrop className={className} />}
      </Transition>
    ))

    stateList.push(state)
  }
})()
