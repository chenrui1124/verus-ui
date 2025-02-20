<script lang="ts" setup>
import type { DropdownSelectProps } from './DropdownSelect.vue'

import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useListener } from '@/composable'
import { vAutofocus, vFocus } from '@/directives'
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

useListener({ keydown: evt => evt.key === 'Escape' && off() })

const modelValue = defineModel<string | undefined>()

function autofocus(value: string, index: number) {
  if (!modelValue.value) return index === 0
  return value === modelValue.value
}

function setValue(value: string) {
  modelValue.value = value
  off()
}

const focusIndex = ref()

function onArrowUp() {
  const len = items.length
  focusIndex.value = (focusIndex.value - 1 + len) % len
}

function onArrowDown() {
  focusIndex.value = (focusIndex.value + 1) % items.length
}

onBeforeMount(() => {
  const index = items.findIndex(i => modelValue.value === i.value)
  focusIndex.value = index === -1 ? 0 : index
})

onMounted(() => disableScroll(true))

onUnmounted(() => disableScroll(false))
</script>

<template>
  <div
    popover="manual"
    @click.self="off"
    @keydown.up="onArrowUp"
    @keydown.down="onArrowDown"
    class="inset-0 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300 **:box-border"
  >
    <div
      tabindex="-1"
      :style="contentStyle"
      class="absolute inline-flex max-h-[50%dvh] flex-col rounded-v2 border border-otl-var bg-sur p-0.5 text-on-sur drop-shadow-sm transition duration-300 ease-braking"
    >
      <div
        class="inline-flex flex-1 flex-col flex-nowrap gap-1 overflow-x-hidden overflow-y-auto rounded-[inherit] p-1.5"
      >
        <button
          v-for="({ text, value }, index) of items"
          :key="index"
          v-autofocus="autofocus(value, index)"
          v-focus="index === focusIndex"
          @click="setValue(value)"
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
