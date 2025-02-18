<script lang="ts" setup>
import type { DropdownSelectProps } from './DropdownSelect.vue'

import { useTemplateRef } from 'vue'
import { useListener } from '@/composable'
import { vAutofocus } from '@/directives'
import { ui } from '@/utils'

export type PopoverContentStyle = {
  top?: string
  left?: string
  bottom?: string
  width?: string
  maxHeight?: string
  transformOrigin?: string
}

const { off } = defineProps<{
  contentStyle: PopoverContentStyle
  items: DropdownSelectProps['items']
  off: () => void
}>()

useListener({ keydown: evt => evt.key === 'Escape' && off() })

const modelValue = defineModel<string | undefined>()

const popoverContent = useTemplateRef('popoverContent')

function onArrowUp(evt: KeyboardEvent) {
  if (!popoverContent.value) return
  const el = evt.target as HTMLElement
  const els = Array.from(popoverContent.value.children) as HTMLElement[]
  const len = els.length
  const index = (els.indexOf(el) - 1 + len) % len
  els[index].focus()
}

function onArrowDown(evt: KeyboardEvent) {
  if (!popoverContent.value) return
  const el = evt.target as HTMLElement
  const els = Array.from(popoverContent.value.children) as HTMLElement[]
  const len = els.length
  const index = (els.indexOf(el) + 1) % len
  els[index].focus()
}

function autofocus(value: string, index: number) {
  if (!modelValue.value) return index === 0
  return value === modelValue.value
}

function setValue(value: string) {
  modelValue.value = value
  off()
}
</script>

<template>
  <div
    @keydown.up="onArrowUp"
    @keydown.down="onArrowDown"
    @click.self="off"
    popover="manual"
    class="inset-0 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300 **:box-border"
  >
    <div
      ref="popoverContent"
      :style="contentStyle"
      tabindex="-1"
      class="absolute flex max-h-[50%dvh] flex-col flex-nowrap gap-1 overflow-x-hidden overflow-y-auto rounded-v2 border border-otl-var bg-sur p-2 text-on-sur drop-shadow-sm transition duration-300 ease-braking"
    >
      <div
        v-for="({ text, value }, index) of items"
        :key="index"
        tabindex="1"
        v-autofocus="autofocus(value, index)"
        @click="setValue(value)"
        @keydown.enter.self="setValue(value)"
        @keydown.up.down.prevent="null"
        :class="[
          ui('outline_focus_visible'),
          'flex cursor-pointer items-center rounded-v1 px-1 pr-5 text-sm/9 transition duration-300 select-none focus:z-10',
          modelValue === value
            ? 'bg-pri-ctr text-pri before:pointer-events-none before:mr-3 before:ml-1 before:h-5 before:w-1 before:rounded-full before:bg-pri before:transition-colors before:duration-300'
            : 'pl-6 hover:bg-on-sur/5'
        ]"
      >
        <span class="overflow-hidden text-nowrap text-ellipsis">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>
