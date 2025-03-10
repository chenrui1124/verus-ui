<script lang="ts">
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { DirectionProp } from '@/ts'

import { computed, provide, readonly } from 'vue'

export interface ToggleGroupProps {
  modelValue?: string
  direction?: DirectionProp
  disabled?: boolean
  rounded?: boolean
}

export interface ToggleGroupSlots {
  default?(): any
}

export const toggleGroupKey = Symbol() as InjectionKey<{
  props: ComputedRef<Pick<ToggleGroupProps, 'disabled' | 'rounded'>>
  groupModel?: Readonly<Ref<string | undefined>>
  setGroupModel?: (value: string) => void
}>
</script>

<script lang="ts" setup>
const { disabled, rounded } = defineProps<Omit<ToggleGroupProps, 'modelValue'>>()

const modelValue = defineModel<ToggleGroupProps['modelValue']>()

provide(toggleGroupKey, {
  props: computed(() => ({ disabled, rounded })),
  groupModel: readonly(modelValue),
  setGroupModel: (value: string) => void (modelValue.value = value)
})
</script>

<template>
  <div :class="['box-border inline-flex gap-1.5', direction === 'column' && 'flex-col']">
    <slot></slot>
  </div>
</template>
