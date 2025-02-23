<script lang="ts">
import { Icon } from '@/basic'

export interface AlertProps {
  icon?: string
  title?: string
}
</script>

<script lang="ts" setup>
defineProps<AlertProps>()
</script>

<template>
  <div class="flex gap-3 rounded-v4 bg-pri-ctr px-5 py-3 text-sm/loose text-on-pri-var">
    <Icon v-if="icon" :icon class="mt-1 size-5 text-pri" />
    <div class="flex flex-1 flex-col gap-1">
      <span v-if="title" class="font-semibold text-pri">
        {{ title }}
      </span>
      <p class="m-0 mb-1 p-0">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
