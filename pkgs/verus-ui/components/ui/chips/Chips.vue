<script setup lang="ts">
import type { ChipsModel, ChipsProps } from '.'

import { computed } from 'vue'
import { BasicIcon, withPrefix } from '@verus-ui/common'

defineOptions({ name: withPrefix('Chips') })

const { each } = defineProps<ChipsProps>()

const _each = computed(() => each.map(i => (typeof i == 'string' ? { label: i, value: i } : i)))

const modelValue = defineModel<ChipsModel['modelValue']>({ default: undefined })
</script>

<template>
  <div
    class="inline-flex flex-wrap gap-2"
    :class="{ '*:cursor-pointer *:select-none': selectable }"
  >
    <component
      v-for="({ value, icon, label }, index) in _each"
      :key="index"
      :is="selectable ? 'label' : 'span'"
      class="relative box-border inline-flex h-8 items-center justify-center rounded-v1 border-1.2 border-solid border-otl bg-bsc px-4 text-sm text-on-bsc transition duration-300 has-[:checked]:border-transparent has-[:checked]:bg-pri-var has-[:checked]:text-on-pri-var has-[:focus-visible]:v-outline"
    >
      <component
        :is="selectable && 'input'"
        type="checkbox"
        :value
        v-model="modelValue"
        class="absolute inset-0 -z-10 m-auto outline-none"
      />

      <component
        :is="icon && BasicIcon"
        :name="icon"
        size="sm"
        class="-ml-0.5 mr-2 transition-colors duration-300"
      />

      {{ label }}
    </component>
  </div>
</template>
