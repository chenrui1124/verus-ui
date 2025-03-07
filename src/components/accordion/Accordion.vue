<script lang="ts">
import type { StatusProp, VariantProp } from '@/ts'

import { BaseCollapsible, BaseIcon } from '@/base'
import { Status, Variant } from '@/ts'
import { cn, ui } from '@/utils'

export interface AccordionProps {
  icon?: string
  open?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Error>
  title?: string
  /**
   * @default 'solid'
   */
  variant?: VariantProp<Variant.Solid | Variant.Outlined>
}
</script>

<script lang="ts" setup>
const { open, status = Status.Primary, variant = Variant.Solid } = defineProps<AccordionProps>()
</script>

<template>
  <div
    :data-status="status"
    :class="
      cn(
        'relative box-border flex flex-col rounded-v3',
        {
          [Variant.Solid]: 'bg-pri-ctr text-on-pri-var',
          [Variant.Outlined]: [
            ui('cover_by_before'),
            'bg-transparent text-on-sur before:border before:border-otl before:transition before:duration-300 has-aria-expanded:before:border-pri'
          ]
        }[variant]
      )
    "
  >
    <BaseCollapsible :open>
      <template #trigger="{ aria, toggle }">
        <button
          :="aria"
          @click="toggle"
          :class="[
            ui('outline_focus_visible'),
            'box-content flex h-12 cursor-pointer list-none items-center gap-3 rounded-v3 border-none bg-transparent px-6 text-pri transition-all duration-300 select-none *:box-border aria-expanded:py-2 aria-expanded:*:last:rotate-90'
          ]"
        >
          <BaseIcon v-if="icon" :icon class="-ml-1" />
          <span class="pointer-events-none flex-1 text-left text-base/loose tracking-wide">
            {{ title }}
          </span>
          <BaseIcon
            icon="i-[fluent--caret-right-24-filled]"
            class="-mr-1 transition duration-500 ease-braking"
          />
        </button>
      </template>
      <template #default>
        <p class="m-0 box-border rounded-v3 px-6 pt-3 pb-6 text-sm/6">
          <slot></slot>
        </p>
      </template>
    </BaseCollapsible>
  </div>
</template>
