<script lang="ts">
import type { PopoverContentStyle } from './DropdownSelectOptions.vue'

import { computed, reactive, ref, useTemplateRef } from 'vue'
import { Icon } from '@/basic'
import { useResize, useSwitch } from '@/composable'
import { vInViewport } from '@/directives'
import { cn, ui } from '@/utils'
import DropdownSelectOptions from './DropdownSelectOptions.vue'

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

const { state, off, toggle } = useSwitch()

useResize(off)

const modelValue = defineModel<DropdownSelectProps['modelValue']>()

const modelText = computed(() => items.find(i => i.value === modelValue.value)?.text)

const trigger = useTemplateRef('trigger')

const contentStyle = reactive<PopoverContentStyle>({})

const isSideTop = ref<boolean>()

const computedDisabled = computed({
  get: () => disabled,
  set: newValue => {
    if (newValue) off()
  }
})

function onEnter(el: Element) {
  if (!trigger.value) return

  const tRect = trigger.value.getBoundingClientRect()

  const toViewTop = tRect.top
  const toViewBottom = (window.visualViewport?.height ?? window.innerHeight) - tRect.bottom
  const halfViewHeight = (window.visualViewport?.height ?? window.innerHeight) / 2

  const h = [toViewTop, toViewBottom, halfViewHeight].sort((a, b) => a - b)[1]

  contentStyle.left = `${tRect.left}px`
  contentStyle.width = `${tRect.width}px`

  if (toViewTop < toViewBottom) {
    contentStyle.top = `${tRect.bottom}px`
    contentStyle.bottom = 'auto'
    contentStyle.transformOrigin = 'top'
    isSideTop.value = true
  } else {
    contentStyle.top = 'auto'
    contentStyle.bottom = `${tRect.height + toViewBottom}px`
    contentStyle.transformOrigin = 'bottom'
    isSideTop.value = false
  }

  if (el.hasAttribute('popover')) (el as HTMLDivElement).showPopover()

  if (el.getBoundingClientRect().height > h) contentStyle.maxHeight = `${h}px`
}

function isInViewport(el: HTMLElement, isIntersecting: boolean) {
  if (isIntersecting) el.style.pointerEvents = ''
  else el.style.pointerEvents = 'none'
}
</script>

<template>
  <button
    ref="trigger"
    :disabled="computedDisabled"
    @click="toggle"
    v-in-viewport="isInViewport"
    :style="{ width }"
    :class="
      cn(
        ui('outline_focus_visible', 'cover_by_before'),
        block ? 'flex' : 'inline-flex',
        'relative box-border h-9 cursor-pointer items-center justify-center gap-2.5 rounded-v2 border-none bg-transparent px-4 text-sm text-on-sur transition duration-300 **:box-border before:border before:border-solid before:border-otl before:transition before:duration-300 enabled:hover:before:bg-pri/10 disabled:cursor-not-allowed disabled:text-dis disabled:before:border-dis',
        state && 'text-pri before:border-pri before:bg-pri/10'
      )
    "
  >
    <span :class="cn('flex-1 text-left', disabled || (modelText ? 'text-on-sur' : 'text-otl/70'))">
      {{ modelText ?? placeholder }}
    </span>
    <Icon
      icon="i-[fluent--chevron-right-24-regular]"
      :class="
        cn(
          '-mr-1 text-otl transition duration-300',
          modelText && 'text-on-sur',
          state && [isSideTop ? 'rotate-90' : '-rotate-90', 'text-pri']
        )
      "
    />
  </button>

  <Transition
    @enter="onEnter"
    enter-from-class="opacity-0 *:first:scale-75"
    leave-to-class="opacity-0 *:first:scale-75"
  >
    <DropdownSelectOptions v-if="state" :content-style :items :off v-model="modelValue" />
  </Transition>
</template>
