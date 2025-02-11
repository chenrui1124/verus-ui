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
        'group/button relative h-9 cursor-pointer items-center justify-center gap-2 border-none transition duration-300 select-none disabled:cursor-not-allowed',
        'outline-none focus-visible:ring-3 focus-visible:ring-pri/48',
        '*:transition *:duration-300',
        uiBlock ? 'flex' : 'inline-flex',
        uiRounded ? 'rounded-full px-5' : 'rounded-v2 px-4',
        {
          solid: 'bg-pri text-on-pri',
          tonal: 'bg-pri-var text-on-pri-var',
          outlined:
            'bg-sur text-pri before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-solid before:border-otl before:transition before:duration-300 disabled:before:border-dis',
          clean: 'bg-transparent text-pri'
        }[uiVariant],
        !loading &&
          {
            solid: 'enabled:hover:brightness-125 enabled:focus:brightness-75',
            tonal: 'enabled:hover:brightness-105 enabled:focus:brightness-95',
            outlined:
              'enabled:hover:before:bg-pri/12 enabled:focus:before:border-pri enabled:focus:before:bg-pri/24',
            clean: 'enabled:hover:bg-pri/12 enabled:focus:bg-pri/24'
          }[uiVariant],
        {
          'cursor-wait': loading,
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
        { 'group-enabled/button:opacity-0': loading },
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
