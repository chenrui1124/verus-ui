<script lang="ts">
import { inject } from 'vue'
import { dialogKey } from '../dialog/Dialog.vue'

export interface DialogLayoutProps {
  heading?: string
  reverseActions?: boolean
  description?: string
}

export interface DialogLayoutSlots {
  default?(): any
  actions?(): any
}
</script>

<script lang="ts" setup>
const { description } = defineProps<DialogLayoutProps>()

defineSlots<DialogLayoutSlots>()

const injection = inject(dialogKey)
</script>

<template>
  <div class="box-border flex h-full flex-col gap-3 **:box-border">
    <h1 v-if="heading" class="-mt-1 mb-0 text-xl text-pri">{{ heading }}</h1>
    <p
      v-if="description"
      :id="injection?.descriptionId"
      class="-mt-1 mb-0 text-sm/relaxed text-otl"
    >
      {{ description }}
    </p>
    <div data-dialog-content class="flex-1 overflow-auto text-sm/relaxed tracking-wide text-on-sur">
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
