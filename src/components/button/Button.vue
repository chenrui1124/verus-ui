<script lang="ts">
import type { FontWeightProp, StatusProp, TextTransformProp, VariantProp } from '@/ts'

import { BaseIcon } from '@/base'
import { FontWeight, Status, TextTransform, Variant } from '@/ts'
import { cn, ui } from '@/utils'

export interface ButtonProps {
  appendIcon?: string
  block?: boolean
  disabled?: boolean
  /**
   * @default 'normal'
   */
  fontWeight?: FontWeightProp
  icon?: string
  loading?: boolean
  loadingIcon?: string
  rounded?: boolean
  /**
   * @default 'primary'
   */
  status?: StatusProp<Status.Primary | Status.Error>
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
const {
  fontWeight = FontWeight.Normal,
  loading,
  status = Status.Primary,
  variant = Variant.Tonal
} = defineProps<ButtonProps>()

const emit = defineEmits<{ click: [evt: MouseEvent] }>()

function onClick(evt: MouseEvent) {
  loading || emit('click', evt)
}

defineSlots<ButtonSlots>()
</script>

<template>
  <button
    :disabled
    :aria-busy="loading"
    :data-status="status"
    @click="onClick"
    :style="{ width }"
    :class="
      cn(
        'relative box-border h-9 min-w-9 cursor-pointer items-center justify-center gap-3 border border-solid transition duration-300 select-none **:box-border',
        '*:transition *:duration-300',
        block ? 'flex' : 'inline-flex',
        rounded ? 'rounded-full px-5' : 'rounded-v2 px-4',
        {
          [Variant.Solid]: 'border-transparent bg-pri text-on-pri',
          [Variant.Tonal]: 'border-transparent bg-pri-var text-on-pri-var',
          [Variant.Outlined]: 'border-otl bg-transparent text-pri',
          [Variant.Clean]: 'border-transparent bg-transparent text-pri'
        }[variant],
        loading ||
          {
            [Variant.Solid]: 'enabled:hover:brightness-110 enabled:focus:brightness-90',
            [Variant.Tonal]: 'enabled:hover:brightness-105 enabled:focus:brightness-90',
            [Variant.Outlined]:
              'enabled:hover:bg-pri/10 enabled:focus:border-pri enabled:focus:bg-pri/15',
            [Variant.Clean]: 'enabled:hover:bg-pri/10 enabled:focus:bg-pri/15'
          }[variant],
        'disabled:cursor-not-allowed disabled:text-on-dis',
        {
          'cursor-wait *:not-last:opacity-0': loading,
          'disabled:border-dis': variant === Variant.Outlined,
          'disabled:bg-dis': variant === Variant.Solid || variant === Variant.Tonal
        },
        textTransform &&
          {
            [TextTransform.Uppercase]: 'uppercase',
            [TextTransform.Lowercase]: 'lowercase',
            [TextTransform.Capitalize]: 'capitalize'
          }[textTransform],
        {
          [FontWeight.Normal]: 'font-normal',
          [FontWeight.Semibold]: 'font-semibold',
          [FontWeight.Bold]: 'font-bold'
        }[fontWeight],
        ui('outline_focus_visible')
      )
    "
  >
    <BaseIcon v-if="icon" :icon class="-mx-1.5" />
    <span
      v-if="text || $slots.default"
      class="pointer-events-none text-sm/relaxed tracking-wide text-nowrap"
    >
      <slot>{{ text }}</slot>
    </span>
    <BaseIcon v-if="appendIcon" :icon="appendIcon" class="-mx-1.5" />
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
      <BaseIcon
        v-if="!disabled && loading"
        :icon="loadingIcon ?? 'i-[svg-spinners--3-dots-fade]'"
        class="absolute inset-0 m-auto size-6 rounded-[inherit]"
      />
    </Transition>
  </button>
</template>
