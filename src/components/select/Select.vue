<script lang="ts">
import type { DirectionProp } from '@/ts'

import { useId } from 'vue'
import { Icon } from '@/basic'
import { useUi } from '@/utils'

export interface SelectProps<M extends boolean> {
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
const { direction = 'column', name = useId() } = defineProps<Omit<SelectProps<M>, 'modelValue'>>()

const modelValue = defineModel<SelectProps<M>['modelValue']>()
</script>

<template>
  <div
    v-if="items"
    :class="['box-border flex gap-2 text-sm', { row: 'flex-row', column: 'flex-col' }[direction]]"
  >
    <label
      v-for="{ icon, text, value } of items"
      :key="value"
      :class="[
        direction === 'row' && 'flex-1',
        'group/select box-border flex h-12 cursor-pointer items-center justify-center gap-3 rounded-v3 border border-otl/70 px-4.5 text-on-sur transition duration-300 select-none has-checked:border-transparent has-checked:bg-pri-ctr has-checked:text-pri has-[[type=radio]:checked]:pointer-events-none',
        useUi('ring_when_has_focus_visible'),
        // TODO
        'has-disabled:'
      ]"
    >
      <Icon v-if="icon" :icon class="-ml-1 size-5" />
      <span class="pointer-events-none flex-1">{{ text }}</span>
      <input
        :type="multiple ? 'checkbox' : 'radio'"
        :name
        :value
        :disabled
        v-model="modelValue"
        class="m-0 -mr-1 box-border size-4 appearance-none rounded-full border border-otl transition-all duration-500 ease-braking outline-none group-active/select:scale-75 checked:border-4 checked:border-pri"
      />
    </label>
  </div>
</template>
