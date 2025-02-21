<script lang="ts" setup>
import type { DropdownSelectProps } from './DropdownSelect.vue'

import { onMounted, onUnmounted } from 'vue'
import { useCycler, useListener } from '@/composable'
import { vFocus } from '@/directives'
import { cn, disableScroll, ui } from '@/utils'

export type PopoverContentStyle = {
  top?: string
  left?: string
  bottom?: string
  width?: string
  maxHeight?: string
  transformOrigin?: string
}

const { items, off } = defineProps<{
  contentStyle: PopoverContentStyle
  items: DropdownSelectProps['items']
  off: () => void
}>()

const modelValue = defineModel<string | undefined>()

useListener({ keydown: evt => evt.key === 'Escape' && off() })

const { item, prev, next } = useCycler(
  items.length,
  Math.max(
    0,
    items.findIndex(i => i.value === modelValue.value)
  )
)

onMounted(() => disableScroll(true))

onUnmounted(() => disableScroll(false))
</script>

<template>
  <div
    popover="manual"
    @click.self="off"
    @keydown.up="prev"
    @keydown.down="next"
    class="inset-0 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300 **:box-border"
  >
    <div
      :style="contentStyle"
      class="absolute inline-flex max-h-[50%dvh] flex-col rounded-v2 border border-otl-var bg-sur p-0.5 text-on-sur drop-shadow-sm transition duration-300 ease-braking"
    >
      <div
        class="inline-flex flex-1 flex-col flex-nowrap gap-1 overflow-x-hidden overflow-y-auto rounded-[inherit] p-1.5"
      >
        <button
          v-for="({ text, value }, index) of items"
          :key="index"
          v-focus="index === item"
          @click="((modelValue = value), off())"
          @keydown.up.down.prevent="null"
          :class="
            cn(
              ui('outline_focus_visible'),
              'flex cursor-pointer items-center rounded-v1 border-none bg-transparent px-3 text-sm/9 transition duration-300 select-none focus:z-10',
              modelValue === value ? 'pointer-events-none bg-pri-ctr text-pri' : 'hover:bg-on-sur/5'
            )
          "
        >
          <span class="overflow-hidden text-nowrap text-ellipsis">
            {{ text }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
