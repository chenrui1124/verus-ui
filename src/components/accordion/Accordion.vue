<script lang="ts">
import type { StatusProp, VariantProp } from '@/ts'

import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

export interface AccordionProps {
  icon?: string
  open?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<'primary' | 'error'>
  title?: string
  variant?: VariantProp<'solid' | 'outlined'>
}
</script>

<script lang="ts" setup>
const { status = 'primary', variant = 'solid' } = defineProps<AccordionProps>()
</script>

<template>
  <div
    :data-status="status"
    :class="
      cn(
        'relative box-border grid grid-cols-1 grid-rows-[min-content_0fr] rounded-v3 transition-all duration-500 ease-braking has-checked:grid-rows-[min-content_1fr]',
        {
          solid: 'bg-pri-ctr',
          outlined: [
            ui('cover_by_before'),
            'bg-transparent before:border before:border-otl before:transition before:duration-300 has-checked:before:border-pri'
          ]
        }[variant]
      )
    "
  >
    <label
      :class="
        cn(
          'peer box-content flex h-12 cursor-pointer items-center gap-3 rounded-[inherit] px-6 transition-[color,padding,background-color] duration-300 select-none **:box-border has-checked:py-1',
          ui('outline_has_focus_visible'),
          {
            solid: 'bg-pri-ctr text-pri hover:bg-pri/10',
            outlined: 'bg-transparent text-pri hover:bg-pri-ctr'
          }[variant]
        )
      "
    >
      <BaseIcon v-if="icon" :icon class="-ml-0.5" />
      <span class="mb-px flex-1 overflow-hidden text-base text-ellipsis">{{ title }}</span>
      <input
        type="checkbox"
        :checked="!!open"
        class="m-0 -mr-1 i-[fluent--caret-right-24-filled] size-5 min-w-5 appearance-none text-inherit transition duration-500 ease-braking checked:rotate-90"
      />
    </label>
    <div
      class="box-border overflow-y-hidden px-6 py-0 text-sm/loose tracking-wide transition-all duration-500 ease-braking peer-has-checked:pt-3 peer-has-checked:pb-6"
    >
      <slot></slot>
    </div>
  </div>
</template>
