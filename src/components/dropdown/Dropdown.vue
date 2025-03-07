<script lang="ts">
import type { SideProp } from '@/ts'

import { BaseIcon, BasePopover } from '@/base'
import { vFocus } from '@/directives'
import { Side } from '@/ts'

import { ui } from '@/utils'
type DropdownPropsItem = {
  text: string
  action?: (evt: MouseEvent) => void
  disabled?: boolean
  icon?: string
}

export interface DropdownProps {
  items?: DropdownPropsItem[]
  width?: string
}

export interface DropdownSlots {
  trigger?(props: {
    side?: SideProp<Side.Top | Side.Bottom>
    state?: boolean
    togglePopover: (evt: Event) => void
  }): any
}
</script>

<script lang="ts" setup>
const { items } = defineProps<DropdownProps>()

defineSlots<DropdownSlots>()
</script>

<template>
  <BasePopover v-if="items" :width class="border-none bg-on-sur drop-shadow-md">
    <template #trigger="props">
      <slot name="trigger" :="props"></slot>
    </template>
    <template #default="{ hidePopover }">
      <div class="inline-grid grid-cols-[min-content_auto] gap-1 p-1">
        <button
          v-for="({ text, icon, action, disabled }, index) of items"
          :key="index"
          v-focus="index === 0"
          :disabled
          @click="(action?.($event), hidePopover())"
          :class="[
            'col-span-2 inline-grid h-8 cursor-pointer grid-cols-subgrid items-center rounded-v1 border-none bg-transparent px-3.75 text-sur transition duration-300 hover:bg-pri hover:text-on-pri',
            ui('outline_focus_visible')
          ]"
        >
          <BaseIcon v-if="icon" :icon class="col-start-1 mr-0.5 -ml-1.5" />
          <span
            class="pointer-events-none col-start-2 overflow-hidden text-left text-sm/loose text-nowrap text-ellipsis"
          >
            {{ text }}
          </span>
        </button>
      </div>
    </template>
  </BasePopover>
</template>
