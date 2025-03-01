<script lang="ts">
import type { StatusProp } from '@/ts'

import { BaseIcon } from '@/base'
import { cn } from '@/utils'

export interface AlertProps {
  icon?: string
  /**
   * @default 'primary'
   */
  status?: StatusProp<'primary' | 'success' | 'warning' | 'error'>
  title?: string
}
</script>

<script lang="ts" setup>
const { status = 'primary' } = defineProps<AlertProps>()
</script>

<template>
  <div
    :class="
      cn(
        'grid rounded-v4 px-5 py-3 text-sm/loose',
        {
          primary: 'bg-pri-ctr text-pri',
          success: 'bg-suc-ctr text-suc',
          warning: 'bg-wan-ctr text-wan',
          error: 'bg-err-ctr text-err'
        }[status]
      )
    "
  >
    <BaseIcon v-if="icon" :icon class="col-start-1 row-span-2 row-start-1 mt-1 mr-3 size-5" />
    <span v-if="title" class="col-start-2 row-start-1 mb-1">
      {{ title }}
    </span>
    <p class="col-start-2 row-start-2 m-0 mb-1 p-0 text-on-sur">
      <slot></slot>
    </p>
  </div>
</template>
