<script lang="ts">
import { cn, ui } from '@/utils'

export interface DialogLayoutProps {
  reverseActions?: boolean
  subtitle?: string
  title?: string
}

export interface DialogLayoutSlots {
  default?(): any
  actions?(): any
}
</script>

<script lang="ts" setup>
defineProps<DialogLayoutProps>()

defineSlots<DialogLayoutSlots>()
</script>

<template>
  <div class="box-border flex h-full flex-col gap-4 **:box-border">
    <div v-if="title || subtitle" class="flex flex-col gap-[inherit]">
      <div v-if="title" class="-mt-0.5 text-xl/relaxed text-pri">{{ title }}</div>
      <div v-if="subtitle" class="text-sm text-otl">{{ subtitle }}</div>
    </div>
    <div
      data-dialog-content
      :class="
        cn('overflow-auto text-sm/loose tracking-wide text-on-sur', ui('outline_focus_visible'))
      "
    >
      <slot></slot>
    </div>
    <div
      v-if="$slots.actions"
      :class="cn('flex gap-[inherit]', reverseActions ? 'flex-row-reverse' : 'justify-end')"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>
