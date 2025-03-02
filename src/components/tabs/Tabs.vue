<script lang="ts">
import type { MaybeReadonly } from 'mm2r'

import { computed } from 'vue'
import { ui } from '@/utils'

type TabsPropItem = { text: string; value: string }

export interface TabsProps {
  modelValue?: string
  items?: MaybeReadonly<TabsPropItem[]>
  stretch?: boolean
  uniformWidth?: boolean
}

export interface TabsSlots {
  [S: string]: () => any
}
</script>

<script lang="ts" setup generic="T extends TabsPropItem">
interface TabsGenericProps extends TabsProps {
  items: MaybeReadonly<T[]>
}

const { items } = defineProps<Omit<TabsGenericProps, 'modelValue'>>()

const modelValue = defineModel<T['value']>()

const index = computed(() => items?.findIndex(({ value }) => value === modelValue.value))

function setModelValue(value: string) {
  modelValue.value = value
}

const slots = defineSlots<{ [S in T['value']]+?: () => any }>()

const TabsView = ({ name }: { name: string }) => {
  if (!name) return null
  const currentSlot = slots[name as keyof typeof slots]
  if (currentSlot) return currentSlot()
  return null
}
</script>

<template>
  <div v-if="items" class="box-border flex flex-col gap-3 p-1.5">
    <div :class="['flex', stretch && 'flex-col']">
      <div
        :style="{
          gridTemplateColumns: `repeat(${items.length}, ${uniformWidth ? '1fr' : 'auto'})`
        }"
        class="relative grid gap-1.5 rounded-v1"
      >
        <button
          v-for="({ text, value }, key) of items"
          :key
          @click="setModelValue(value)"
          :class="[
            'h-8 cursor-pointer rounded-[inherit] border-none px-4 text-sm/8 transition duration-300',
            modelValue === value
              ? 'pointer-events-none bg-pri-ctr text-pri'
              : 'bg-transparent text-on-sur hover:bg-on-sur/5',
            ui('outline_focus_visible')
          ]"
        >
          {{ text }}
        </button>
      </div>
    </div>

    <div class="overflow-x-hidden">
      <div
        :style="{ transform: index ? `translateX(-${index * 100}%)` : void 0 }"
        class="flex w-full flex-nowrap transition duration-300"
      >
        <div v-for="{ value } of items" class="min-w-full">
          <TabsView :name="value" />
        </div>
      </div>
    </div>
  </div>
</template>
