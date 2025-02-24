<script lang="ts">
import { Icon } from '@/basic'

type NavigationPropsItem = { text: string; icon?: string; value: string }

export interface NavigationProps {
  modelValue?: string
  items?: NavigationPropsItem[]
}
</script>

<script lang="ts" setup>
defineProps<Omit<NavigationProps, 'modelValue'>>()

const modelValue = defineModel<NavigationProps['modelValue']>()

const emit = defineEmits<{ push: [value: NavigationProps['modelValue']] }>()

function setModelValue(evt: MouseEvent) {
  const el = evt.target as HTMLElement
  const value = el.dataset.value
  if (value) emit('push', (modelValue.value = value))
}
</script>

<template>
  <div
    v-if="items"
    @click="setModelValue"
    class="box-border grid grid-cols-[min-content_1fr] flex-col gap-y-1 **:box-border"
  >
    <span
      v-for="({ text, icon, value }, key) in items"
      :key
      tabindex="0"
      :data-value="value"
      :class="[
        'col-span-2 grid cursor-pointer grid-cols-subgrid items-center rounded-v2 border-none px-4 text-left text-sm/9 no-underline transition duration-300',
        modelValue === value
          ? 'pointer-events-none bg-pri-ctr text-pri'
          : 'bg-transparent text-on-sur hover:bg-on-sur/5'
      ]"
    >
      <Icon v-if="icon" :icon class="mr-3 -ml-1 size-5" />
      <span class="pointer-events-none col-start-2">{{ text }} </span>
    </span>
  </div>
</template>
