<script lang="ts">
import type { MaybeReadonly } from 'mm2r'
import type { DirectionProp } from '@/ts'

import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

type ToggleGroupPropsItem = { value: string; icon: string }

export interface ToggleGroupProps {
  modelValue?: string
  direction?: DirectionProp
  items?: MaybeReadonly<ToggleGroupPropsItem>[]
  rounded?: boolean
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
  <div :class="['box-border inline-flex gap-1.5', direction === 'column' && 'flex-col']">
    <button
      v-for="{ icon, value } in items"
      :key="value"
      :tabindex="modelValue === value ? '-1' : void 0"
      @click="setValue(value)"
      :class="
        cn(
          ui('outline_focus_visible'),
          'relative box-border h-9 cursor-pointer border-none bg-transparent p-1.5 transition duration-300 **:box-border disabled:cursor-not-allowed disabled:text-dis',
          rounded ? 'rounded-full' : 'rounded-v2',
          modelValue === value
            ? 'pointer-events-none bg-pri-ctr text-pri disabled:bg-dis/30'
            : 'text-otl enabled:hover:bg-sur-var'
        )
      "
    >
      <BaseIcon :icon size="md" class="transition duration-300" />
    </button>
  </div>
</template>
