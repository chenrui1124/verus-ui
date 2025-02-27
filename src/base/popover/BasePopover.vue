<script lang="ts">
import { ref } from 'vue'
import { useSwitch } from '@/composable'
import PopoverContent from './BasePopoverContent.vue'

type PopoverPropsLocateMode = 'target' | 'pointer'

type PopoverSlotsSide = 'top' | 'bottom'

type PopoverSlotsShowParams<T> = T extends 'target'
  ? Event | null
  : T extends 'pointer'
    ? MouseEvent | PointerEvent
    : never

interface PopoverProps<T extends PopoverPropsLocateMode> {
  disabled?: boolean
  /**
   * @default 'target'
   */
  locateMode?: T
}

interface PopoverSlots<T extends PopoverPropsLocateMode> {
  trigger?(props: {
    state: boolean | undefined
    side: PopoverSlotsSide | undefined
    togglePopover: (elementOrCoord: PopoverSlotsShowParams<T>) => void
  }): any
  default?(props: { hidePopover: () => void }): any
}
</script>

<script lang="ts" setup generic="T extends PopoverPropsLocateMode">
const { disabled, locateMode = 'target' } = defineProps<PopoverProps<T>>()

const { state, on, off: hidePopover } = useSwitch()

const style = ref<
  Partial<Record<'top' | 'bottom' | 'left' | 'width' | 'maxHeight' | 'transformOrigin', string>>
>({})

const side = ref<PopoverSlotsSide>()

function showPopover(event: PopoverSlotsShowParams<T>) {
  if (disabled) return
  if (!event) return
  if (locateMode === 'target') {
    const el = (event as Event).target as HTMLElement
    const tRect = el.getBoundingClientRect()
    const vh = window.visualViewport?.height ?? window.innerHeight
    const elToViewTop = tRect.top
    const elToViewBottom = vh - tRect.bottom
    const halfViewHeight = vh / 2
    const edgeDistance = 16
    const mh = [elToViewTop, elToViewBottom, halfViewHeight].sort((a, b) => a - b)[1] - edgeDistance
    if (elToViewTop < elToViewBottom) {
      style.value = {
        top: `${tRect.bottom}px`,
        bottom: 'auto',
        transformOrigin: 'top'
      }
      side.value = 'bottom'
    } else {
      style.value = {
        top: 'auto',
        bottom: `${elToViewBottom + tRect.height}px`,
        transformOrigin: 'bottom'
      }
      side.value = 'top'
    }
    style.value.left = `${tRect.left}px`
    style.value.width = `${tRect.width}px`
    style.value.maxHeight = `${mh}px`
  }
  if (locateMode === 'pointer') {
    const evt = event as MouseEvent | PointerEvent
    style.value = {
      top: `${evt.clientY}px`,
      left: `${evt.clientX}px`,
      transformOrigin: 'top left'
    }
  }
  on()
}

function togglePopover(elementOrCoord: PopoverSlotsShowParams<T>) {
  state.value ? hidePopover() : showPopover(elementOrCoord)
}

function onEnter(el: Element) {
  if (el.hasAttribute('popover')) (el as HTMLDivElement).showPopover()
}

function onAfterLeave() {
  style.value = {}
  side.value = void 0
}

defineSlots<PopoverSlots<T>>()
</script>

<template>
  <slot name="trigger" :="{ state, side, togglePopover }"></slot>

  <Transition
    @enter="onEnter"
    @after-leave="onAfterLeave"
    enter-from-class="opacity-0 *:first:scale-75"
    leave-to-class="opacity-0 *:first:scale-75"
  >
    <PopoverContent v-if="state" :disabled :hidePopover :style>
      <slot :="{ hidePopover }"></slot>
    </PopoverContent>
  </Transition>
</template>
