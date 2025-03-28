<script lang="ts">
import type { MaybeReadonly } from 'mm2r'

import { computed, ref, useId } from 'vue'
import { ui } from '@/utils'

type TabsPropItem = { text: string; value: string }

export interface TabsProps {
  modelValue?: string
  items: MaybeReadonly<TabsPropItem[]>
  stretch?: boolean
  fixedWidth?: boolean
}

export interface TabsSlots {
  [S: string]: () => any
}
</script>

<script lang="ts" setup>
const { modelValue, items } = defineProps<TabsProps>()

const historical = ref<number>(items.findIndex(({ value }) => value === modelValue))

const enterFromClass = ref()

const leaveToClass = ref()

const _modelValue = ref<string | undefined>(modelValue)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const modelAccessor = computed({
  get() {
    return _modelValue.value
  },
  set(newValue) {
    if (newValue === _modelValue.value) return
    const index = items.findIndex(({ value }) => newValue === value)
    if (index === -1) return

    if (historical.value !== -1) {
      if (index > historical.value) {
        enterFromClass.value = 'translate-x-full'
        leaveToClass.value = '-translate-x-full'
      } else {
        enterFromClass.value = '-translate-x-full'
        leaveToClass.value = 'translate-x-full'
      }
    } else {
      enterFromClass.value = 'opacity-0'
    }

    emit('update:modelValue', (_modelValue.value = newValue)!)
    historical.value = index
  }
})

const itemsWithId = computed(() =>
  items.map(({ text, value }) => ({
    text,
    value,
    tabId: useId(),
    tabpanelId: useId()
  }))
)

const activeTabpanelId = computed(
  () => itemsWithId.value.find(({ value }) => value === modelAccessor.value)?.tabpanelId
)

const activeTabId = computed(
  () => itemsWithId.value.find(({ value }) => value === modelAccessor.value)?.tabId
)

function setTabValue(value: string) {
  if (value) modelAccessor.value = value
}

defineSlots<TabsSlots>()
</script>

<template>
  <div class="box-border flex flex-col">
    <div :class="['flex px-1.5', stretch && 'flex-col']">
      <div
        role="tablist"
        aria-orientation="horizontal"
        :class="[
          'box-border grid grid-flow-col grid-rows-1 gap-1.5 rounded-v1',
          fixedWidth && 'auto-cols-fr'
        ]"
      >
        <button
          v-for="({ tabId, tabpanelId, text, value }, key) of itemsWithId"
          :key
          :id="tabId"
          role="tab"
          :aria-controls="tabpanelId"
          type="button"
          :aria-selected="modelAccessor === value"
          @click="setTabValue(value)"
          :class="[
            'box-border h-8 cursor-pointer rounded-[inherit] border-none px-4 text-sm/6 text-nowrap transition duration-300 select-none',
            modelAccessor === value
              ? 'pointer-events-none bg-pri-ctr text-pri'
              : 'bg-transparent text-on-sur hover:bg-on-sur/5',
            ui('outline_focus_visible')
          ]"
        >
          {{ text }}
        </button>
      </div>
    </div>

    <div v-if="Object.keys($slots).length !== 0" class="relative box-border overflow-x-hidden">
      <Transition
        :enter-from-class="enterFromClass"
        :leave-to-class="leaveToClass"
        leave-active-class="absolute"
      >
        <div
          v-if="modelAccessor"
          :key="modelAccessor"
          role="tabpanel"
          :id="activeTabpanelId"
          :aria-labelledby="activeTabId"
          class="box-border w-full p-1.5 transition duration-500 ease-braking"
        >
          <slot :name="`${modelAccessor ?? ''}`"></slot>
        </div>
      </Transition>
    </div>
  </div>
</template>
