<script lang="ts">
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
  <div class="box-border flex h-full flex-col gap-3 **:box-border">
    <div v-if="title" class="-mt-0.5 text-xl text-pri">{{ title }}</div>
    <div v-if="subtitle" class="-mt-0.5 text-sm text-otl">{{ subtitle }}</div>
    <div data-dialog-content class="flex-1 overflow-auto text-sm/loose tracking-wide text-on-sur">
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
