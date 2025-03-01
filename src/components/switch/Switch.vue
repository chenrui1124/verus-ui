<script lang="ts">
import type { StatusProp } from '@/ts'

import { cn, ui } from '@/utils'

export interface SwitchProps {
  modelValue?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<'primary' | 'error'>
  disabled?: boolean
}
</script>

<script lang="ts" setup>
defineProps<Omit<SwitchProps, 'modelValue'>>()

const modelValue = defineModel<SwitchProps['modelValue']>()
</script>

<template>
  <label
    :data-status="status"
    :class="
      cn(
        'group/switch relative box-border inline-block h-7 w-12 cursor-pointer rounded-full bg-sur transition duration-300 **:box-border',
        'before:border before:border-solid before:border-otl before:bg-otl/20 before:transition before:duration-300 has-checked:before:border-transparent has-checked:before:bg-pri',
        'has-disabled:cursor-not-allowed has-disabled:opacity-30 has-disabled:before:border-dis has-disabled:before:bg-dis',
        '*:top-1/2 *:left-3.5 has-checked:*:translate-x-5',
        ui('cover_by_before', 'outline_has_focus_visible')
      )
    "
  >
    <input
      type="checkbox"
      :disabled
      v-model="modelValue"
      class="peer pointer-events-none absolute -m-2.5 inline-block size-5 appearance-none rounded-full bg-otl transition duration-300 ease-braking outline-none not-checked:scale-75 group-active/switch:scale-125 checked:bg-sur"
    />
    <span
      class="pointer-events-none absolute -m-4.5 inline-block size-9 rounded-full transition duration-300 ease-braking group-hover/switch:bg-on-sur/10 group-hover/switch:peer-checked:bg-pri/10 peer-disabled:hidden"
    ></span>
  </label>
</template>
