<script lang="ts">
import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

export interface AccordionProps {
  danger?: boolean
  icon?: string
  open?: boolean
  title?: string
}
</script>

<script lang="ts" setup>
defineProps<AccordionProps>()
</script>

<template>
  <div
    :data-status="danger ? 'error' : void 0"
    class="box-border grid grid-cols-1 grid-rows-[min-content_0fr] rounded-v3 bg-pri-ctr transition-all duration-500 ease-braking has-checked:grid-rows-[min-content_1fr]"
  >
    <label
      :class="
        cn(
          'peer box-content flex h-12 cursor-pointer items-center gap-3 rounded-[inherit] px-6 text-pri transition-[color,padding,background-color] duration-300 select-none hover:bg-pri/10 has-checked:py-1',
          ui('outline_has_focus_visible')
        )
      "
    >
      <BaseIcon v-if="icon" :icon class="-ml-0.5 size-5" />
      <span class="mb-px flex-1 text-base">{{ title }}</span>
      <input
        type="checkbox"
        :checked="!!open"
        class="m-0 -mr-0.5 i-[fluent--chevron-right-24-regular] size-5 appearance-none text-inherit transition duration-500 ease-braking checked:rotate-90"
      />
    </label>
    <div
      class="overflow-y-hidden px-6 py-0 text-sm/loose tracking-wide text-on-pri-var transition-all duration-500 ease-braking peer-has-checked:pt-3 peer-has-checked:pb-6"
    >
      <slot></slot>
    </div>
  </div>
</template>
