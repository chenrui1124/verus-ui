<script lang="ts">
import type { FontWeightProp, TextTransformProp, VariantProp } from '@/ts'

import { Icon } from '@/basic'
import { cn } from '@/utils'

export interface ButtonProps {
  appendIcon?: string
  disabled?: boolean
  icon?: string
  loading?: boolean
  text?: string
  uiBlock?: boolean
  uiDanger?: boolean
  /**
   * @default 'normal'
   */
  uiFontWeight?: FontWeightProp
  /**
   * `true` -> `border-radius: calc(infinity * 1px)`
   *
   * `false` -> `border-radius: 0.4rem`
   */
  uiRounded?: boolean
  uiTextTransform?: TextTransformProp
  /**
   * @default 'tonal'
   */
  uiVariant?: VariantProp
}
</script>

<script lang="ts" setup>
const { loading, uiFontWeight = 'normal', uiVariant = 'tonal' } = defineProps<ButtonProps>()

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
    :data-status="uiDanger ? 'error' : void 0"
    :class="
      cn(
        'group relative h-9 cursor-pointer items-center justify-center gap-2 border border-solid transition duration-300 select-none disabled:cursor-not-allowed',
        'outline-none focus-visible:ring-3 focus-visible:ring-pri/48',
        '*:transition *:duration-300',
        !loading && {
          'enabled:hover:brightness-125 enabled:focus:brightness-75': uiVariant === 'solid',
          'enabled:hover:brightness-105 enabled:focus:brightness-95': uiVariant === 'tonal',
          'enabled:hover:bg-pri/12 enabled:focus:bg-pri/24': ['outlined', 'clean'].includes(
            uiVariant
          ),
          'enabled:focus:border-pri': uiVariant === 'outlined'
        },
        { 'cursor-wait': loading },
        uiBlock ? 'flex' : 'inline-flex',
        uiRounded ? 'rounded-full px-5' : 'rounded-v2 px-4',
        {
          solid: 'border-transparent bg-pri text-on-pri',
          tonal: 'border-transparent bg-pri-var text-on-pri-var',
          outlined: 'border-otl bg-sur text-pri',
          clean: 'border-transparent bg-transparent text-pri'
        }[uiVariant],
        {
          'disabled:border-dis': uiVariant === 'outlined',
          'disabled:bg-dis/36': ['solid', 'tonal'].includes(uiVariant)
        },
        'disabled:text-dis'
      )
    "
  >
    <Icon v-if="icon" :icon class="-ml-1 size-5" />
    <span
      :class="[
        'pointer-events-none text-sm tracking-wide',
        { 'group-enabled:opacity-0': loading },
        uiTextTransform
          ? {
              uppercase: 'uppercase',
              lowercase: 'lowercase',
              capitalize: 'capitalize'
            }[uiTextTransform]
          : void 0,
        {
          normal: 'font-normal',
          semibold: 'font-semibold',
          bold: 'font-bold'
        }[uiFontWeight]
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
