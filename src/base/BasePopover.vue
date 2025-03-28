<script lang="ts">
import type { EffectScope, HTMLAttributes, TransitionProps } from 'vue'
import type { AlignProp } from '@/ts'

import { effectScope, ref, useAttrs, watchEffect } from 'vue'
import { useDelegation, useDisableScrollbar, useSwitch, useWindowResize } from '@/composable'
import { Align } from '@/ts'
import { cn } from '@/utils'

type PopoverSlotsSide = 'top' | 'bottom'

interface BasePopoverProps {
  /**
   * @default 'center'
   */
  align?: AlignProp
  disabled?: boolean
  /**
   * @default 'target'
   */
  mode?: 'target' | 'pointer'
  width?: string
}

interface BasePopoverSlots {
  trigger?(props: {
    side?: PopoverSlotsSide
    state?: boolean
    togglePopover: (evt: Event) => void
  }): any
  default?(props: { hidePopover: () => void }): any
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const { align = Align.Center, disabled, mode = 'target', width } = defineProps<BasePopoverProps>()

const side = ref<PopoverSlotsSide>()

const style = ref<
  Partial<Record<'top' | 'bottom' | 'left' | 'width' | 'maxHeight' | 'transformOrigin', string>>
>({})

let scope: EffectScope | null

const {
  state,
  on,
  off: hidePopover
} = useSwitch({
  onSwitch: nv => {
    if (nv) {
      scope = effectScope()
      scope.run(() => {
        useDelegation({ keydown: evt => evt.key === 'Escape' && hidePopover() })
        useDisableScrollbar()
        useWindowResize(hidePopover)
        watchEffect(() => disabled && hidePopover())
      })
    } else {
      if (scope) {
        scope.stop()
        scope = null
      }
    }
  }
})

function showPopover(evt: Event) {
  if (disabled || !evt || evt.type.startsWith('touch')) return

  if (mode === 'target') {
    const el = evt.currentTarget as HTMLElement
    const tRect = el.getBoundingClientRect()
    const vh = window.visualViewport?.height ?? window.innerHeight
    const heights = [tRect.top, vh - tRect.bottom, vh / 2]
    const [toViewTop, toViewBottom] = heights
    const EDGE_DISTANCE = 16
    const mh = heights.sort((a, b) => a - b)[1] - EDGE_DISTANCE

    if (toViewTop < toViewBottom) {
      style.value = {
        top: `${tRect.bottom}px`,
        bottom: 'auto',
        transformOrigin: 'top'
      }
      side.value = 'bottom'
    } else {
      style.value = {
        top: 'auto',
        bottom: `${toViewBottom + tRect.height}px`,
        transformOrigin: 'bottom'
      }
      side.value = 'top'
    }
    style.value.left = {
      [Align.Left]: `${tRect.right}px`,
      [Align.Center]: `${(tRect.left + tRect.right) / 2}px`,
      [Align.Right]: `${tRect.left}px`
    }[align]
    if (align === Align.Left) style.value.transformOrigin += ' right'
    if (align === Align.Right) style.value.transformOrigin += ' left'
    style.value.width = width ?? `${tRect.width}px`
    style.value.maxHeight = `${mh}px`
  } else if (mode === 'pointer') {
    const event = evt as MouseEvent | PointerEvent
    style.value = {
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
      transformOrigin: 'top left'
    }
  }
  on()
}

function togglePopover(evt: Event) {
  state.value ? hidePopover() : showPopover(evt)
}

const onEnter: TransitionProps['onEnter'] = el => {
  if (el.hasAttribute('popover')) (el as HTMLDivElement).showPopover()
}

const onAfterLeave = () => {
  side.value = void 0
  style.value = {}
}

const { class: cv, ...others } = useAttrs()

defineSlots<BasePopoverSlots>()
</script>

<template>
  <slot name="trigger" :="{ side, state, togglePopover }"></slot>

  <Transition
    @enter="onEnter"
    @after-leave="onAfterLeave"
    enter-from-class="opacity-0 *:first:scale-90 *:first:drop-shadow-none"
    leave-to-class="opacity-0 *:first:scale-90 *:first:drop-shadow-none"
  >
    <div
      v-if="state"
      popover="manual"
      @click.self="hidePopover"
      class="inset-0 z-40 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300 ease-braking"
    >
      <div
        :="others"
        :style
        :class="
          cn(
            'absolute my-1 box-border inline-flex flex-col rounded-v3 border border-otl-var bg-sur p-0.5 text-on-sur drop-shadow-xs transition duration-300 ease-braking',
            {
              [Align.Left]: '-translate-x-full',
              [Align.Center]: '-translate-x-1/2',
              [Align.Right]: ''
            }[align],
            cv as HTMLAttributes['class']
          )
        "
      >
        <slot :="{ hidePopover }"></slot>
      </div>
    </div>
  </Transition>
</template>
