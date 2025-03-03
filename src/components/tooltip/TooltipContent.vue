<script lang="ts">
import type { TransitionProps } from 'vue'
import type { TooltipProps } from '.'

import { iconUri } from '@/base'
import { cn } from '@/utils'

interface TooltipContentProps extends Pick<TooltipProps, 'side'> {
  delay?: number
  state?: boolean
}

interface TooltipContentSlots {
  default(): any
}
</script>

<script lang="ts" setup>
const { delay, side = 'top' } = defineProps<TooltipContentProps>()

const onBeforeEnter: TransitionProps['onBeforeEnter'] = el => {
  delay && ((el as HTMLDivElement).style.transitionDelay = `${delay}ms`)
}

const onAfterEnter: TransitionProps['onAfterEnter'] = el => {
  delay && ((el as HTMLDivElement).style.transitionDelay = '')
}

defineSlots<TooltipContentSlots>()
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @after-enter="onAfterEnter"
    enter-from-class="scale-75 opacity-0"
    leave-to-class="scale-75 opacity-0"
  >
    <div
      v-if="state"
      id="v-tooltip"
      role="tooltip"
      :class="
        cn(
          {
            top: '-mt-2 origin-bottom -translate-x-1/2 -translate-y-full',
            right: 'ml-2 origin-left -translate-y-1/2',
            bottom: 'mt-2 origin-top -translate-x-1/2',
            left: '-ml-2 origin-right -translate-x-full -translate-y-1/2'
          }[side],
          'pointer-events-none fixed z-40 box-border h-8 rounded-v2 bg-on-sur px-3 text-center text-sm/8 text-nowrap text-sur drop-shadow-md transition duration-300 ease-braking **:box-border'
        )
      "
    >
      <span
        :style="{
          maskImage: `url(${iconUri.tooltipArrow})`,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%'
        }"
        :class="[
          'absolute inline-block size-6 bg-current text-on-sur drop-shadow-md',
          {
            top: '-bottom-3 left-1/2 -translate-x-1/2',
            right: 'top-1/2 -left-3 -translate-y-1/2 rotate-90',
            bottom: '-top-3 left-1/2 -translate-x-1/2 rotate-180',
            left: 'top-1/2 -right-3 -translate-y-1/2 -rotate-90'
          }[side]
        ]"
      ></span>
      <slot></slot>
    </div>
  </Transition>
</template>
