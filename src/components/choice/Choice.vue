<script lang="ts">
import type { DirectionProp } from '@/ts'

import { useId } from 'vue'
import { BaseIcon } from '@/base'
import { cn, ui } from '@/utils'

export interface ChoiceProps<M extends boolean> {
  modelValue?: M extends true ? string[] : string
  /**
   * @default 'column'
   */
  direction?: DirectionProp
  disabled?: boolean
  items: ({ value: string } & ({ icon?: string; text: string } | { icon: string; text?: string }))[]
  /**
   * When multiple is true, the type of modelValue will be `string[]`.
   */
  multiple?: M
  /**
   * If name is empty, `useId()` will be used, it's return a no special meaning string.
   */
  name?: string
}
</script>

<script lang="ts" setup generic="M extends boolean">
const { direction = 'column', name = useId() } = defineProps<Omit<ChoiceProps<M>, 'modelValue'>>()

const modelValue = defineModel<ChoiceProps<M>['modelValue']>()
</script>

<template>
  <div
    v-if="items"
    :class="
      cn(
        'box-border flex gap-2 text-sm **:box-border',
        { row: 'flex-row', column: 'flex-col' }[direction]
      )
    "
  >
    <label
      v-for="{ icon, text, value } of items"
      :key="value"
      :class="
        cn(
          direction === 'row' && 'flex-1',
          'group/select flex h-12 cursor-pointer items-center justify-center gap-3 rounded-v3 border border-otl/70 px-4.5 text-on-sur transition duration-300 select-none has-checked:border-transparent has-checked:bg-pri-ctr has-checked:text-pri has-[[type=radio]:checked]:pointer-events-none',
          ui('outline_has_focus_visible'),
          'has-disabled:cursor-not-allowed has-disabled:text-dis has-[:checked:disabled]:bg-dis/30 has-[:not(:checked):disabled]:border-dis'
        )
      "
    >
      <BaseIcon v-if="icon" :icon class="-ml-1 size-5" />
      <span class="pointer-events-none flex-1">{{ text }}</span>
      <input
        :type="multiple ? 'checkbox' : 'radio'"
        :name
        :value
        :disabled
        v-model="modelValue"
        class="m-0 -mr-1 size-4 appearance-none rounded-full border border-otl transition-all duration-500 ease-braking outline-none group-active/select:scale-75 checked:border-4 checked:border-pri disabled:border-dis"
      />
    </label>
  </div>
</template>
