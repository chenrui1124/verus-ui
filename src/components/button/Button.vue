<script lang="ts">
import type { FontWeightProp, TextTransformProp, VariantProp } from '@/ts'

import { Icon } from '@/basic'
import { cn } from '@/utils'

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
  loading?: boolean
  /**
   * `true` -> `border-radius: calc(infinity * 1px)`
   *
   * `false` -> `border-radius: 0.4rem`
   */
  rounded?: boolean
  text?: string
  textTransform?: TextTransformProp
  /**
   * @default 'tonal'
   */
  variant?: VariantProp
}
</script>

<script lang="ts" setup>
const { loading, fontWeight = 'normal', variant = 'tonal' } = defineProps<ButtonProps>()

const emit = defineEmits<{ click: [evt: MouseEvent] }>()

function onClick(evt: MouseEvent) {
  if (loading) return
  emit('click', evt)
}
</script>

<template>
  <button
    @click="onClick"
    :disabled
    :data-status="danger ? 'error' : void 0"
    :class="
      cn(
        'group/button relative box-border h-9 cursor-pointer items-center justify-center gap-2 border border-solid transition duration-300 select-none disabled:cursor-not-allowed',
        'outline-none focus-visible:ring-3 focus-visible:ring-pri/48',
        '*:transition *:duration-300',
        block ? 'flex' : 'inline-flex',
        rounded ? 'rounded-full px-5' : 'rounded-v2 px-4',
        {
          solid: 'border-transparent bg-pri text-on-pri',
          tonal: 'border-transparent bg-pri-var text-on-pri-var',
          outlined: 'border-otl bg-transparent text-pri',
          clean: 'border-transparent bg-transparent text-pri'
        }[variant],
        !loading &&
          {
            solid: 'enabled:hover:brightness-125 enabled:focus:brightness-75',
            tonal: 'enabled:hover:brightness-105 enabled:focus:brightness-95',
            outlined: 'enabled:hover:bg-pri/12 enabled:focus:border-pri enabled:focus:bg-pri/24',
            clean: 'enabled:hover:bg-pri/12 enabled:focus:bg-pri/24'
          }[variant],
        {
          'cursor-wait': loading,
          'disabled:border-dis': variant === 'outlined',
          'disabled:bg-dis/36': ['solid', 'tonal'].includes(variant)
        },
        'disabled:text-dis'
      )
    "
  >
    <Icon v-if="icon" :icon class="-ml-1 size-5" />
    <span
      :class="[
        'pointer-events-none text-sm tracking-wide',
        { 'group-enabled/button:opacity-0': loading },
        textTransform
          ? {
              uppercase: 'uppercase',
              lowercase: 'lowercase',
              capitalize: 'capitalize'
            }[textTransform]
          : void 0,
        {
          normal: 'font-normal',
          semibold: 'font-semibold',
          bold: 'font-bold'
        }[fontWeight]
      ]"
    >
      <slot>{{ text }}</slot>
    </span>
    <Icon v-if="appendIcon" :icon="appendIcon" class="-mr-1 size-5" />
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <Icon
        v-if="!disabled && loading"
        icon="i-[svg-spinners--3-dots-fade]"
        class="absolute inset-0 m-auto size-6 rounded-[inherit]"
      />
    </Transition>
  </button>
</template>
