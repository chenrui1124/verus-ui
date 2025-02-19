<script lang="ts">
import type { FontWeightProp, TextTransformProp, VariantProp } from '@/ts'

import { Icon } from '@/basic'
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
  /**
   * If loading's type is string, it will be used as icon name.
   */
  loading?: boolean | string
  /**
   * `true` => `border-radius: calc(infinity * 1px)`, `false` => `border-radius: 0.4rem`
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
    :data-status="danger ? 'error' : void 0"
    :disabled
    @click="onClick"
    :class="
      cn(
        'relative box-border h-9 cursor-pointer items-center justify-center gap-2 border border-solid transition duration-300 select-none **:box-border',
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
        'disabled:cursor-not-allowed disabled:text-dis',
        {
          'cursor-wait *:not-last:opacity-0': loading,
          'disabled:border-dis': variant === 'outlined',
          'disabled:bg-dis/30': ['solid', 'tonal'].includes(variant)
        },
        ui('outline_focus_visible')
      )
    "
  >
    <Icon v-if="icon" :icon class="-ml-1 size-5" />
    <span
      :class="
        cn(
          'pointer-events-none text-sm tracking-wide text-nowrap',
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
          }[fontWeight]
        )
      "
    >
      <slot>{{ text }}</slot>
    </span>
    <Icon v-if="appendIcon" :icon="appendIcon" class="-mr-1 size-5" />
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <Icon
        v-if="!disabled && loading"
        :icon="typeof loading === 'string' && loading ? loading : 'i-[svg-spinners--3-dots-fade]'"
        class="absolute inset-0 m-auto size-6 rounded-[inherit]"
      />
    </Transition>
  </button>
</template>
