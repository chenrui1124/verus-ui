<script setup lang="ts">
import type { SegmentedButtonModel, SegmentedButtonProps } from '.'

import { computed } from 'vue'
import { Icon } from '@base'

defineOptions({ name: 'SegmentedButton' })

const { each, direction = 'row' } = defineProps<SegmentedButtonProps>()

const modelValue = defineModel<SegmentedButtonModel['modelValue']>()

const _each = computed(() => each.map(i => (typeof i == 'string' ? { text: i, value: i } : i)))
</script>

<template>
  <div
    :class="[
      'relative rounded-v1 transition-colors duration-300 before:v-shade before:border-v1 before:border-solid before:border-otl',
      direction === 'row' ? 'inline-flex' : 'inline-grid grid-cols-1'
    ]"
  >
    <label
      v-for="(item, index) in _each"
      :key="index"
      :class="[
        'relative cursor-pointer items-center bg-transparent px-4 text-otl transition duration-inherit hover:bg-pri/8 has-[:checked]:border-pri has-[:checked]:bg-pri-ctr has-[:checked]:text-pri has-[:focus-visible]:v-outline',

        {
          row: '-mx-[0.6px] inline-flex justify-center border-v1 border-solid border-l-transparent first:ml-0 first:rounded-l-inherit first:border-l-otl last:mr-0 last:rounded-r-inherit',
          col: 'col-span-2 -my-[0.6px] inline-grid grid-cols-subgrid border-v1 border-solid border-t-transparent first:mt-0 first:rounded-t-inherit first:border-t-otl last:mb-0 last:rounded-b-inherit'
        }[direction],

        '*:transition-colors *:duration-300'
      ]"
    >
      <input
        type="radio"
        :value="item.value"
        v-model="modelValue"
        class="pointer-events-none absolute inset-0 -z-10 m-auto opacity-0 outline-none"
      />
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        size="sm"
        :class="['-ml-1 mr-2', { 'col-start-1': direction === 'col' }]"
      />
      <span
        :class="[
          'pointer-events-none h-9 select-none text-left text-sm/9',
          { 'col-start-2': direction === 'col' }
        ]"
      >
        {{ item.text }}
      </span>
    </label>
  </div>
</template>
