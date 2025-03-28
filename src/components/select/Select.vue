<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MaybeReadonly } from 'mm2r'

import { computed, useAttrs, useId } from 'vue'
import { BaseIcon, BasePopover } from '@/base'
import { useCycler } from '@/composable'
import { vFocus, vInViewport } from '@/directives'
import { cn, ui } from '@/utils'

type SelectPropsItem = { text: string; value: string }

export interface SelectProps {
  modelValue?: string
  block?: boolean
  disabled?: boolean
  items: MaybeReadonly<SelectPropsItem>[]
  placeholder?: string
  width?: string
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const { disabled, items } = defineProps<Omit<SelectProps, 'modelValue'>>()

const modelValue = defineModel<SelectProps['modelValue']>()

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

const { class: cv, ...others } = useAttrs()

const controlId = useId()

const listboxId = useId()
</script>

<template>
  <BasePopover
    :id="listboxId"
    role="listbox"
    :aria-labelledby="controlId"
    aria-orientation="vertical"
    :disabled
    class="**:box-border"
  >
    <template #trigger="{ state, side, togglePopover }">
      <button
        :id="controlId"
        role="combobox"
        :aria-controls="listboxId"
        :aria-expanded="!!state"
        aria-haspopup="listbox"
        :="others"
        :disabled
        @click="togglePopover"
        v-in-viewport="isInViewport"
        :style="{ width }"
        :class="
          cn(
            ui('outline_focus_visible', 'cover_by_before'),
            'relative box-border h-10 cursor-pointer items-center justify-center gap-3 rounded-v2 border-none bg-transparent px-4.25 transition duration-300 **:box-border before:border before:border-solid before:border-otl before:transition before:duration-300 enabled:hover:before:bg-pri/10 disabled:cursor-not-allowed disabled:text-on-dis disabled:before:border-on-dis',
            block ? 'flex' : 'inline-flex',
            state && 'before:border-pri before:bg-pri/10',
            cv as HTMLAttributes['class']
          )
        "
      >
        <span
          :class="[
            'pointer-events-none flex-1 text-left text-sm/loose transition duration-300',
            disabled || (modelText ? 'text-on-sur' : 'text-otl/70'),
            state && 'text-pri'
          ]"
        >
          {{ modelText ?? placeholder }}
        </span>
        <BaseIcon
          icon="i-[fluent--caret-right-24-filled]"
          size="sm"
          :class="
            cn(
              '-mr-1.5 transition duration-300',
              disabled ? 'text-dis' : 'text-otl',
              state && ['text-pri', side && { top: '-rotate-90', bottom: 'rotate-90' }[side]]
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
          role="option"
          :aria-selected="modelValue === value"
          v-focus="index === item"
          @click="((modelValue = value), hidePopover())"
          @keydown.up.down.prevent="null"
          :class="
            cn(
              ui('outline_focus_visible'),
              'inline-flex min-h-9 cursor-pointer items-center rounded-v1 border-none bg-transparent px-3.75 py-0.5 transition duration-300 select-none focus:z-10',
              modelValue === value
                ? 'pointer-events-none bg-pri-ctr text-pri'
                : 'text-inherit hover:bg-sur-var'
            )
          "
        >
          <span class="overflow-hidden text-nowrap text-ellipsis">{{ text }}</span>
        </button>
      </div>
    </template>
  </BasePopover>
</template>
