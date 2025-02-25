<script lang="ts">
import type { MaybeReadonly } from 'mm2r'

import { ui } from '@/utils'

type TabsPropItem = { text: string; value: string }

export interface TabsProps {
  modelValue?: string
  items?: MaybeReadonly<TabsPropItem[]>
}

export interface TabsSlots {
  [S: string]: () => any
}
</script>

<script lang="ts" setup generic="T extends TabsPropItem">
defineProps<Omit<TabsProps & { items?: MaybeReadonly<T[]> }, 'modelValue'>>()

const modelValue = defineModel<T['value']>()

const slots = defineSlots<{ [S in T['value']]?: () => any }>()

const TabsView = () =>
  modelValue.value && modelValue.value in slots && slots[modelValue.value as keyof typeof slots]!()
</script>

<template>
  <div class="box-border flex flex-col gap-1" v-if="items">
    <div class="box-border flex gap-1 p-1">
      <button
        v-for="({ text, value }, key) of items"
        :key
        @click="modelValue = value"
        :class="[
          'h-8 cursor-pointer rounded-v1 border-none px-4 text-sm/8 transition duration-300',
          modelValue === value
            ? 'pointer-events-none bg-pri-ctr text-pri'
            : 'bg-transparent text-on-sur hover:bg-on-sur/5',
          ui('outline_focus_visible')
        ]"
      >
        {{ text }}
      </button>
    </div>
    <div class="relative p-3 text-sm text-on-sur">
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        leave-active-class="absolute"
      >
        <div :key="modelValue" class="transition duration-300">
          <component :is="TabsView"></component>
        </div>
      </Transition>
    </div>
  </div>
</template>
