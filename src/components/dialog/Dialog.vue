<script lang="ts">
import type { TransitionProps } from 'vue'
import type { Aria, StatusProp } from '@/ts'

import { useBackdrop, useSwitch } from '@/composable'
import { Status } from '@/ts'

export interface DialogProps {
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Error>
  /**
   * @default '24rem'
   */
  width?: string
}

export interface DialogSlots {
  trigger?(props: { aria: Aria.Collapsible; show: () => void }): any
  default?(props: { hide: () => void }): any
}
</script>

<script lang="ts" setup>
const { status = Status.Primary, width = '24rem' } = defineProps<DialogProps>()

const { state, on, off } = useSwitch()

const onEnter: TransitionProps['onEnter'] = (el: Element) => {
  void (el as HTMLDialogElement).showModal()
}

const onAfterLeave: TransitionProps['onAfterEnter'] = (el: Element) => {
  void (el as HTMLDialogElement).close()
}

useBackdrop(state)

defineSlots<DialogSlots>()
</script>

<template>
  <slot name="trigger" :="{ show: on }"></slot>

  <Teleport to="body">
    <Transition
      @enter="onEnter"
      @after-leave="onAfterLeave"
      enter-from-class="-translate-y-[45vh] grid-rows-[0fr] *:py-0"
      enter-active-class="duration-700 select-none *:overflow-hidden **:data-dialog-content:overflow-hidden"
      enter-to-class="grid-rows-[1fr]"
      leave-from-class="grid-rows-[1fr]"
      leave-active-class="select-none *:overflow-hidden **:data-dialog-content:overflow-hidden"
      leave-to-class="-translate-y-[45vh] grid-rows-[0fr] *:py-0"
    >
      <dialog
        v-if="state"
        :data-status="status"
        @cancel="off"
        :style="{ width }"
        style="
          max-width: calc(100vw - 10vmin);
          max-height: calc(100vh - 10vmin);
          max-height: calc(100dvh - 10vmin);
        "
        class="fixed inset-0 z-40 m-auto box-border grid grid-cols-1 rounded-v4 border-none bg-pri-ctr p-0 transition-all duration-500 ease-braking outline-none backdrop:hidden"
      >
        <div
          style="max-height: calc(100dvh - 3rem - 10vmin)"
          class="box-border rounded-v4 p-6 transition-all duration-300 has-data-dialog-content:flex"
        >
          <slot :="{ hide: off }"></slot>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>
