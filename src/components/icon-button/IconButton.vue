<script lang="ts">
import { Icon } from '@/basic'
import { ui } from '@/utils'

export interface IconButtonProps {
  icon?: string
  danger?: boolean
  disabled?: boolean
}
</script>

<script lang="ts" setup>
defineProps<IconButtonProps>()

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
    @click="onClick"
    :disabled
    :data-status="danger ? 'error' : void 0"
    :class="[
      'box-border size-9 cursor-pointer rounded-v2 border-none bg-transparent p-2 text-pri transition duration-300 hover:bg-pri/10 hover:brightness-110 focus:bg-pri/20 focus:brightness-110 active:*:first:scale-75',
      ui('outline_focus_visible')
    ]"
  >
    <Icon v-if="icon" :icon class="size-5 transition duration-300 ease-in-out" />
  </button>
</template>
