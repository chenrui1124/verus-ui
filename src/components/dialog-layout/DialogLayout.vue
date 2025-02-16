<script lang="ts">
import { ui } from '@/utils'

export interface DialogLayoutProps {
  title?: string
  subtitle?: string
  reverseActions?: boolean
}

export interface DialogLayoutSlots {
  default?(): any
  actions?(): any
}
</script>

<script lang="ts" setup>
defineProps<DialogLayoutProps>()
</script>

<template>
  <div class="box-border flex h-full flex-col gap-4">
    <div v-if="title || subtitle" class="flex flex-col gap-[inherit]">
      <div v-if="title" class="-mt-0.5 text-xl text-pri">{{ title }}</div>
      <div v-if="subtitle" class="text-sm text-otl">{{ subtitle }}</div>
    </div>
    <div
      data-dialog-content
      :class="['overflow-auto text-sm/7 text-on-sur', ui('outline_focus_visible')]"
    >
      <slot></slot>
    </div>
    <div
      v-if="$slots.actions"
      :class="['flex gap-[inherit]', reverseActions ? 'flex-row-reverse' : 'justify-end']"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>
