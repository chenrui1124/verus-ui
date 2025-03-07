<script lang="ts">
import type { StatusProp } from '@/ts'

import { useSwitch } from '@/composable'
import { Status } from '@/ts'
import { cn, ui } from '@/utils'

export interface SwitchProps {
  modelValue?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Error>
  disabled?: boolean
}
</script>

<script lang="ts" setup>
const { status = Status.Primary } = defineProps<Omit<SwitchProps, 'modelValue'>>()

const modelValue = defineModel<SwitchProps['modelValue']>()

const { state, toggle } = useSwitch({ modelValue })
</script>

<template>
  <button
    :disabled
    role="switch"
    :aria-checked="state"
    :data-status="status"
    @click="toggle"
    :class="
      cn(
        'group/switch relative box-border inline-block h-7 w-12 cursor-pointer rounded-full border-none bg-sur transition duration-300 **:box-border',
        'before:border before:border-solid before:border-otl before:bg-otl/20 before:transition before:duration-300 aria-checked:before:border-transparent enabled:aria-checked:before:bg-pri',
        'disabled:cursor-not-allowed disabled:before:border-dis disabled:before:bg-dis',
        ui('cover_by_before', 'outline_focus_visible'),
        'after:absolute after:top-1/2 after:left-3.5 after:-m-4.5 after:size-9 after:rounded-full after:transition after:duration-300 after:ease-braking hover:after:bg-on-sur/10 disabled:after:opacity-0 aria-checked:after:translate-x-5 aria-checked:hover:after:bg-pri/10'
      )
    "
  >
    <span
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-3.5 -m-2.5 inline-block size-5 rounded-full bg-otl drop-shadow-sm transition duration-300 ease-braking outline-none group-not-aria-checked/switch:scale-75 group-disabled/switch:bg-on-dis group-aria-checked/switch:translate-x-5 group-aria-checked/switch:bg-sur group-[:enabled:active]/switch:scale-125"
    ></span>
  </button>
</template>
