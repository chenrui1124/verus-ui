<script lang="ts">
import type { Direction, VariantProp } from '@/ts'

import { computed, useId } from 'vue'
import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

type ChoicePropsItem = { value: string } & (
  | { icon?: string; text: string }
  | { icon: string; text?: string }
)

export interface ChoiceProps<M extends boolean> {
  modelValue?: M extends true ? string[] : string
  /**
   * @default 'column'
   */
  direction?: Direction
  disabled?: boolean
  items: ChoicePropsItem[]
  /**
   * When multiple is true, the type of modelValue will be `string[]`.
   */
  multiple?: M
  width?: string
  /**
   * @default 'solid'
   */
  variant?: VariantProp<'solid' | 'outlined'>
}
</script>

<script lang="ts" setup generic="M extends boolean">
const {
  direction = 'column',
  multiple,
  variant = 'solid'
} = defineProps<Omit<ChoiceProps<M>, 'modelValue'>>()

const name = computed(() => (multiple ? void 0 : useId()))

const modelValue = defineModel<ChoiceProps<M>['modelValue']>()
</script>

<template>
  <div
    v-if="items"
    :style="{ width }"
    :class="
      cn(
        'box-border **:box-border',
        {
          row: 'grid grid-flow-col grid-rows-[min-content_1fr] gap-1.5',
          column: 'grid grid-cols-[min-content_1fr_min-content] gap-x-3 gap-y-1.5'
        }[direction]
      )
    "
  >
    <label
      v-for="{ icon, text, value } of items"
      :key="value"
      :class="
        cn(
          'group/select cursor-pointer rounded-v3 border text-on-sur transition duration-300 select-none has-checked:bg-pri-ctr has-checked:text-pri has-[[type=radio]:checked]:pointer-events-none',
          ui('outline_has_focus_visible'),
          'has-disabled:cursor-not-allowed has-disabled:text-on-dis has-[:checked:disabled]:bg-dis',
          {
            solid: 'border-transparent bg-sur-var',
            outlined:
              'border-otl-var bg-transparent has-checked:border-transparent has-[:not(:checked):disabled]:border-dis'
          }[variant],
          {
            row: 'row-span-2 grid grid-rows-subgrid items-center px-4.5 py-3',
            column: 'col-span-3 grid h-12 grid-cols-subgrid items-center px-4.5'
          }[direction]
        )
      "
    >
      <BaseIcon
        v-if="icon"
        :icon
        :class="[
          'size-5',
          { row: 'col-start-1 row-start-1 -ml-0.5', column: 'col-start-1 -ml-1' }[direction]
        ]"
      />
      <span
        :class="[
          'pointer-events-none text-sm/loose',
          { row: 'col-span-3 col-start-1 row-start-2 flex-1', column: 'col-start-2' }[direction]
        ]"
      >
        {{ text }}
      </span>
      <input
        :type="multiple ? 'checkbox' : 'radio'"
        :name
        :value
        :disabled
        v-model="modelValue"
        :class="[
          'm-0 -mr-1 ml-1 size-4 appearance-none rounded-full border border-otl transition-all duration-500 ease-braking outline-none group-active/select:scale-75 checked:border-4 checked:border-pri disabled:border-on-dis',
          { row: 'col-start-3 row-start-1 justify-self-end', column: 'col-start-3' }[direction]
        ]"
      />
    </label>
  </div>
</template>
