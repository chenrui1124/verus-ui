<script lang="ts">
import { computed } from 'vue'
import { BaseIcon, BasePopover } from '@/base'
import { useCycler } from '@/composable'
import { vFocus, vInViewport } from '@/directives'
import { cn, ui } from '@/utils'

export interface DropdownSelectProps {
  modelValue?: string
  block?: boolean
  disabled?: boolean
  items: { text: string; value: string }[]
  placeholder?: string
  width?: string
}
</script>

<script lang="ts" setup>
const { disabled, items } = defineProps<Omit<DropdownSelectProps, 'modelValue'>>()

const modelValue = defineModel<DropdownSelectProps['modelValue']>()

const modelText = computed(() => items.find(i => i.value === modelValue.value)?.text)

function isInViewport(el: HTMLElement, isIntersecting: boolean) {
  el.style.pointerEvents = isIntersecting ? '' : 'none'
}

const { item, prev, next } = useCycler(
  items.length,
  Math.max(
    0,
    items.findIndex(i => i.value === modelValue.value)
  )
)
</script>

<template>
  <BasePopover :disabled>
    <template #trigger="{ state, side, togglePopover }">
      <button
        :disabled
        @click="togglePopover"
        v-in-viewport="isInViewport"
        :style="{ width }"
        :class="
          cn(
            ui('outline_focus_visible', 'cover_by_before'),
            'relative box-border h-9 cursor-pointer items-center justify-center gap-2.5 rounded-v2 border-none bg-transparent px-4 text-sm text-on-sur transition duration-300 **:box-border before:border before:border-solid before:border-otl before:transition before:duration-300 enabled:hover:before:bg-pri/10 disabled:cursor-not-allowed disabled:text-dis disabled:before:border-dis',
            block ? 'flex' : 'inline-flex',
            state && 'text-pri before:border-pri before:bg-pri/10'
          )
        "
      >
        <span
          :class="
            cn(
              'pointer-events-none flex-1 text-left',
              disabled || (modelText ? 'text-on-sur' : 'text-otl/70')
            )
          "
        >
          {{ modelText ?? placeholder }}
        </span>
        <BaseIcon
          icon="i-[fluent--chevron-right-24-regular]"
          :class="
            cn(
              '-mr-1 text-otl transition duration-300',
              disabled ? 'text-dis' : modelText && 'text-on-sur',
              state && side && { top: '-rotate-90', bottom: 'rotate-90' }[side],
              state && 'text-pri'
            )
          "
        />
      </button>
    </template>
    <template #default="{ hidePopover }">
      <div
        @keydown.up="prev"
        @keydown.down="next"
        class="overflew-y-auto inline-flex flex-1 flex-col flex-nowrap gap-1 overflow-x-hidden rounded-[inherit] p-1.5"
      >
        <button
          v-for="({ text, value }, index) of items"
          :key="index"
          v-focus="index === item"
          @click="((modelValue = value), hidePopover())"
          @keydown.up.down.prevent="null"
          :class="
            cn(
              ui('outline_focus_visible'),
              'inline-flex cursor-pointer items-center rounded-v1 border-none bg-transparent px-3 text-sm/9 transition duration-300 select-none focus:z-10',
              modelValue === value ? 'pointer-events-none bg-pri-ctr text-pri' : 'hover:bg-on-sur/5'
            )
          "
        >
          <span class="overflow-hidden text-nowrap text-ellipsis">{{ text }}</span>
        </button>
      </div>
    </template>
  </BasePopover>
</template>
