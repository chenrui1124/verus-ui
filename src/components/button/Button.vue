<script lang="ts">
import type { FontWeightProp, TextTransformProp, VariantProp } from '@/ts'

import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

export interface ButtonProps {
  appendIcon?: string
  block?: boolean
  danger?: boolean
  disabled?: boolean
  /**
   * @default 'normal'
   */
  fontWeight?: FontWeightProp
  icon?: string
  loading?: boolean | string
  rounded?: boolean
  text?: string
  textTransform?: TextTransformProp
  /**
   * @default 'tonal'
   */
  variant?: VariantProp
  width?: string
}

export interface ButtonSlots {
  default?(): string
}
</script>

<script lang="ts" setup>
const { loading, fontWeight = 'normal', variant = 'tonal' } = defineProps<ButtonProps>()

const emit = defineEmits<{ click: [evt: MouseEvent] }>()

function onClick(evt: MouseEvent) {
  loading || emit('click', evt)
}

defineSlots<ButtonSlots>()
</script>

<template>
  <button
    :data-status="danger ? 'error' : void 0"
    :disabled
    @click="onClick"
    :style="{ width }"
    :class="
      cn(
        'relative box-border h-9 min-w-9 cursor-pointer items-center justify-center gap-3 border border-solid transition duration-300 select-none **:box-border',
        '*:transition *:duration-300',
        block ? 'flex' : 'inline-flex',
        rounded ? 'rounded-full px-5' : 'rounded-v2 px-4',
        {
          solid: 'border-transparent bg-pri text-on-pri',
          tonal: 'border-transparent bg-pri-var text-on-pri-var',
          outlined: 'border-otl bg-transparent text-pri',
          clean: 'border-transparent bg-transparent text-pri'
        }[variant],
        loading ||
          {
            solid: 'enabled:hover:brightness-110 enabled:focus:brightness-90',
            tonal: 'enabled:hover:brightness-105 enabled:focus:brightness-90',
            outlined: 'enabled:hover:bg-pri/10 enabled:focus:border-pri enabled:focus:bg-pri/15',
            clean: 'enabled:hover:bg-pri/10 enabled:focus:bg-pri/15'
          }[variant],
        'disabled:cursor-not-allowed disabled:text-on-dis',
        {
          'cursor-wait *:not-last:opacity-0': loading,
          'disabled:border-dis': variant === 'outlined',
          'disabled:bg-dis': ['solid', 'tonal'].includes(variant)
        },
        textTransform &&
          {
            uppercase: 'uppercase',
            lowercase: 'lowercase',
            capitalize: 'capitalize'
          }[textTransform],
        {
          normal: 'font-normal',
          semibold: 'font-semibold',
          bold: 'font-bold'
        }[fontWeight],
        ui('outline_focus_visible')
      )
    "
  >
    <BaseIcon v-if="icon" :icon class="-mx-1.5 size-5" />
    <span
      v-if="text || $slots.default"
      class="pointer-events-none text-sm/loose tracking-wide text-nowrap"
    >
      <slot>{{ text }}</slot>
    </span>
    <BaseIcon v-if="appendIcon" :icon="appendIcon" class="-mx-1.5 size-5" />
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <BaseIcon
        v-if="!disabled && loading"
        :icon="typeof loading === 'string' && loading ? loading : 'i-[svg-spinners--3-dots-fade]'"
        class="absolute inset-0 m-auto size-6 rounded-[inherit]"
      />
    </Transition>
  </button>
</template>
