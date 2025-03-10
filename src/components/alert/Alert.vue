<script lang="ts">
import type { StatusProp } from '@/ts'

import { normalizeClass } from 'vue'
import { BaseIcon } from '@/base'
import { Status } from '@/ts'
import { cn } from '@/utils'

export interface AlertProps {
  icon?: string
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Success | Status.Warning | Status.Error>
  title?: string
}

export interface AlertSlots {
  default?(): any
}
</script>

<script lang="ts" setup>
const { status = Status.Primary } = defineProps<AlertProps>()

defineSlots<AlertSlots>()
</script>

<template>
  <div
    role="region"
    :class="
      cn(
        'grid grid-cols-[min-content_1fr] rounded-v3 px-5 py-3 text-sm/6',
        {
          [Status.Primary]: 'bg-pri-ctr text-pri',
          [Status.Success]: 'bg-suc-ctr text-suc',
          [Status.Warning]: 'bg-wan-ctr text-wan',
          [Status.Error]: 'bg-err-ctr text-err'
        }[status]
      )
    "
  >
    <BaseIcon
      v-if="icon"
      :icon
      class="col-start-1 row-span-2 row-start-1 mt-0.5 mr-3 -ml-1 size-5"
    />
    <span v-if="title" class="col-start-2 row-start-1 mb-1 tracking-wide">
      {{ title }}
    </span>
    <p class="col-start-2 row-start-2 m-0 mb-1 p-0 text-on-sur">
      <slot></slot>
    </p>
  </div>
</template>
