<script lang="ts" setup>
import type { TooltipProps } from '.'

import { cn } from '@/utils'

const { side = 'top' } = defineProps<Pick<TooltipProps, 'side'> & { state?: boolean }>()
</script>

<template>
  <Transition enter-from-class="scale-75 opacity-0" leave-to-class="scale-75 opacity-0">
    <div
      v-if="state"
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
      <slot></slot>
      <span
        :class="
          cn(
            'absolute inline-block size-2 origin-center rotate-45 bg-inherit drop-shadow-md',
            {
              top: '-bottom-1 left-1/2 -translate-x-1/2',
              right: 'top-1/2 -left-1 -translate-y-1/2',
              bottom: '-top-1 left-1/2 -translate-x-1/2',
              left: 'top-1/2 -right-1 -translate-y-1/2'
            }[side]
          )
        "
      ></span>
    </div>
  </Transition>
</template>
