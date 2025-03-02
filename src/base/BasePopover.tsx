import type { HTMLAttributes, PropType, SlotsType, TransitionProps } from 'vue'

import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  Transition,
  withModifiers
} from 'vue'
import { useListener, useResize, useSwitch } from '@/composable'
import { cn, disableScroll } from '@/utils'

type PopoverSlotsSide = 'top' | 'bottom'

interface BasePopoverProps {
  disabled?: boolean
  mode?: 'target' | 'pointer'
  width?: string
}

interface BasePopoverSlots {
  trigger?(props: {
    state?: boolean
    side?: PopoverSlotsSide
    togglePopover: (evt: Event) => void
  }): any
  default?(props: { hidePopover: () => void }): any
}

interface BasePopoverContentProps extends Pick<BasePopoverProps, 'disabled'> {
  hidePopover: () => void
}

const BasePopoverContent = defineComponent(
  (props: BasePopoverContentProps, { attrs, slots }) => {
    useListener({ keydown: evt => evt.key === 'Escape' && props.hidePopover() })
    useResize(() => props.hidePopover())
    onMounted(() => disableScroll(true))
    onUpdated(() => props.disabled && props.hidePopover())
    onUnmounted(() => disableScroll(false))
    const { class: cv, ...others } = attrs

    return () => (
      <div
        popover='manual'
        onClick={withModifiers(() => props.hidePopover(), ['self'])}
        class='inset-0 z-40 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300'
      >
        <div
          {...others}
          class={cn(
            'absolute -mx-1 my-1 box-border inline-flex flex-col rounded-v3 border border-otl-var bg-sur p-0.5 text-on-sur drop-shadow-xs transition duration-300 ease-braking',
            cv as HTMLAttributes['class']
          )}
        >
          {slots.default?.()}
        </div>
      </div>
    )
  },
  {
    inheritAttrs: false,
    props: {
      disabled: Boolean as PropType<BasePopoverProps['disabled']>,
      hidePopover: Function as PropType<BasePopoverContentProps['hidePopover']>
    }
  }
)

const BasePopover = defineComponent<BasePopoverProps, any, any, SlotsType<BasePopoverSlots>>(
  (props, { attrs, slots }) => {
    const { state, on, off: hidePopover } = useSwitch()

    const side = ref<PopoverSlotsSide>()

    const style = ref<
      Partial<Record<'top' | 'bottom' | 'left' | 'width' | 'maxHeight' | 'transformOrigin', string>>
    >({})

    function showPopover(evt: Event) {
      if (props.disabled || !evt || evt.type.startsWith('touch')) return
      if (props.mode === 'target') {
        const el = evt.target as HTMLElement
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
        style.value.left = `${tRect.left}px`
        style.value.width = props.width ?? `calc(${tRect.width}px + 0.5rem)`
        style.value.maxHeight = `${mh}px`
      } else if (props.mode === 'pointer') {
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

    const onEnter: TransitionProps['onEnter'] = (el: Element) => {
      if (el.hasAttribute('popover')) (el as HTMLDivElement).showPopover()
    }

    const onAfterLeave: TransitionProps['onAfterLeave'] = () => {
      side.value = void 0
      style.value = {}
    }

    return () => (
      <>
        {slots.trigger?.({ side: side.value, state: state.value, togglePopover })}
        <Transition
          {...{ onEnter, onAfterLeave }}
          enterFromClass='opacity-0 *:first:scale-75 *:first:drop-shadow-none'
          leaveToClass='opacity-0 *:first:scale-75 *:first:drop-shadow-none'
        >
          {state.value && (
            <BasePopoverContent
              {...attrs}
              disabled={props.disabled}
              hidePopover={hidePopover}
              style={style.value}
            >
              {slots.default?.({ hidePopover })}
            </BasePopoverContent>
          )}
        </Transition>
      </>
    )
  },
  {
    inheritAttrs: false,
    props: {
      disabled: Boolean,
      mode: {
        type: String as PropType<BasePopoverProps['mode']>,
        default: 'target'
      },
      width: String
    }
  }
)

export default BasePopover
