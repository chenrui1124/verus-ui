<script lang="ts">
import type { Either, MaybeReadonly } from 'mm2r'
import type { AlignProp, Aria, SideProp } from '@/ts'

import { useId } from 'vue'
import { BaseIcon, BasePopover } from '@/base'
import { vFocus } from '@/directives'
import { Align, Side } from '@/ts'
import { ui } from '@/utils'

type DropdownPropsItem = {
  text: string
  action?: (evt: MouseEvent) => void
  disabled?: boolean
  icon?: string
}

export interface DropdownProps {
  /**
   * @default 'center'
   */
  align?: AlignProp
  items: MaybeReadonly<Either<DropdownPropsItem, { is: 'divider' }>[]>
  width?: string
}

export interface DropdownSlots {
  trigger?(props: {
    aria?: Aria.DropdownTrigger
    side?: SideProp<Side.Top | Side.Bottom>
    state?: boolean
    togglePopover: (evt: Event) => void
  }): any
}
</script>

<script lang="ts" setup>
const { align = Align.Center, items } = defineProps<DropdownProps>()

defineSlots<DropdownSlots>()

const controlId = useId()

const menuId = useId()

const createAria = (state: boolean): Aria.DropdownTrigger => ({
  id: controlId,
  'aria-controls': menuId,
  'aria-expanded': state,
  'aria-haspopup': 'menu'
})
</script>

<template>
  <BasePopover
    :id="menuId"
    role="menu"
    :aria-labelledby="controlId"
    aria-orientation="vertical"
    :align
    :width
    class="border-otl-var bg-on-sur drop-shadow-md"
  >
    <template #trigger="props">
      <slot name="trigger" :="{ aria: createAria(!!props.state), ...props }"></slot>
    </template>
    <template #default="{ hidePopover }">
      <div class="inline-grid grid-cols-[min-content_auto] gap-1 p-1">
        <template v-for="({ text, icon, action, disabled, is }, index) of items" :key="index">
          <hr v-if="is === 'divider'" class="col-span-2 my-0.5 h-px w-full border-none bg-sur/12" />
          <button
            v-else
            role="menuitem"
            v-focus="index === 0"
            :disabled
            @click="(action?.($event), hidePopover())"
            :class="[
              'col-span-2 inline-grid h-8 cursor-pointer grid-cols-subgrid items-center rounded-v1 border-none bg-transparent px-3.25 text-sur transition duration-300 hover:bg-pri hover:text-on-pri',
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
        </template>
      </div>
    </template>
  </BasePopover>
</template>
