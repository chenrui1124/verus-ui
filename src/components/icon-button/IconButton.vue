<script lang="ts">
import type { StatusProp } from '@/ts'

import { BaseIcon } from '@/base'
import { Status } from '@/ts'
import { cn, ui } from '@/utils'

export interface IconButtonProps {
  disabled?: boolean
  icon?: string
  rounded?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Error>
}
</script>

<script lang="ts" setup>
const { status = Status.Primary } = defineProps<IconButtonProps>()

const emit = defineEmits<{ click: [evt: MouseEvent] }>()

let timeout: number | undefined

function onClick(evt: MouseEvent) {
  const el = evt.currentTarget as HTMLButtonElement
  el.classList.add('*:first:scale-75')
  if (!timeout) {
    timeout = window.setTimeout(() => {
      requestAnimationFrame(() => el.classList.remove('*:first:scale-75'))
      timeout = void 0
    }, 150)
  }
  emit('click', evt)
}
</script>

<template>
  <button
    :disabled
    :data-status="status"
    @click="onClick"
    :class="
      cn(
        'box-border size-9 cursor-pointer border-none bg-transparent p-1.5 text-pri transition duration-300 **:box-border hover:bg-pri/10 hover:brightness-110 focus:bg-pri/20 focus:brightness-110 active:*:first:scale-75',
        ui('outline_focus_visible'),
        rounded ? 'rounded-full' : 'rounded-v2'
      )
    "
  >
    <BaseIcon v-if="icon" :icon size="lg" class="transition duration-300 ease-in-out" />
  </button>
</template>
