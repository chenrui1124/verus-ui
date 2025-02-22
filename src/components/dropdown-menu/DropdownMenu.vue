<script lang="ts">
import type { ButtonProps } from '@/components'

import { Icon, Popover } from '@/basic'
import { VButton } from '@/components'
import { ui } from '@/utils'

interface DropdownMenuPropsItem {
  text: string
  icon?: string
  action?: (evt: MouseEvent) => void
  disabled?: boolean
}

interface DropdownMenuProps extends Omit<ButtonProps, 'appendIcon'> {
  items?: DropdownMenuPropsItem[]
}
</script>

<script lang="ts" setup>
const { items, ...buttonProps } = defineProps<DropdownMenuProps>()
</script>

<template>
  <Popover v-if="items">
    <template #trigger="{ togglePopover }">
      <VButton
        ref="button"
        @click="togglePopover"
        :="buttonProps"
        append-icon="i-[fluent--chevron-down-24-regular]"
      />
    </template>
    <template #default="{ hidePopover }">
      <div class="inline-flex flex-col gap-1 p-0.5">
        <button
          v-for="({ text, icon, action, disabled }, index) of items"
          :key="index"
          :disabled
          @click="(action?.($event), hidePopover())"
          :class="[
            'inline-flex h-9 cursor-pointer items-center gap-2 rounded-v1 border-none bg-transparent px-4 text-sm/loose text-on-sur transition duration-300 hover:bg-pri-ctr',
            ui('outline_focus_visible')
          ]"
        >
          <Icon v-if="icon" :icon class="-ml-2 size-5" />
          <span class="pointer-events-none overflow-hidden text-nowrap text-ellipsis">
            {{ text }}
          </span>
        </button>
      </div>
    </template>
  </Popover>
</template>
