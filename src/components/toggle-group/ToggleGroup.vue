<script lang="ts">
import type { DirectionProp } from '@/ts'

import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

export interface ToggleGroupProps {
  modelValue?: string
  direction?: DirectionProp
  rounded?: boolean
  items?: { icon: string; value: string }[]
}
</script>

<script lang="ts" setup>
defineProps<Omit<ToggleGroupProps, 'modelValue'>>()

const modelValue = defineModel<ToggleGroupProps['modelValue']>()

function setValue(value: string) {
  modelValue.value = value
}
</script>

<template>
  <div :class="['box-border inline-flex gap-3', direction === 'column' && 'flex-col']">
    <button
      v-for="{ icon, value } in items"
      :key="value"
      :tabindex="modelValue === value ? '-1' : void 0"
      @click="setValue(value)"
      :class="
        cn(
          ui('outline_focus_visible'),
          'relative box-border h-10 cursor-pointer border-none bg-transparent p-2 transition duration-300 **:box-border disabled:cursor-not-allowed disabled:text-dis',
          rounded ? 'rounded-full' : 'rounded-v2',
          modelValue === value
            ? 'pointer-events-none bg-pri/10 text-pri disabled:bg-dis/30'
            : 'text-otl enabled:hover:bg-on-sur/5'
        )
      "
    >
      <BaseIcon :icon class="size-6 transition duration-300" />
    </button>
  </div>
</template>
