import type { PropType } from 'vue'
import type { SideProp } from '@/ts'

import { defineComponent, mergeProps, reactive } from 'vue'
import { useDelegation, useRender, useSwitch } from '@/composable'
import TooltipContent from './TooltipContent.vue'

export interface TooltipProps {
  /**
   * @default 200
   */
  delay?: number
  disabled?: boolean
  /**
   * @default 'top'
   */
  side?: SideProp
  text?: string
}

function useSingleTooltipCreator() {
  const props = reactive<Pick<TooltipProps, 'delay' | 'side' | 'text'>>({})
  const style = reactive<{ top?: string; left?: string }>({})

  const { state, on, off } = useSwitch()

  function showTooltip(evt: Event) {
    const el = evt.target as HTMLElement
    const { tooltipDelay, tooltipSide, tooltipText } = el.dataset
    if (
      tooltipSide &&
      tooltipText &&
      ['top', 'right', 'bottom', 'left'].includes(tooltipSide) &&
      props &&
      style
    ) {
      props.side = tooltipSide as TooltipProps['side']
      props.text = tooltipText
      const { top, right, bottom, left } = el.getBoundingClientRect()
      const center = { top: `${(top + bottom) / 2}px`, left: `${(right + left) / 2}px` }
      switch (tooltipSide) {
        case 'top':
          style.top = `${top}px`
          style.left = center.left
          break
        case 'right':
          style.top = center.top
          style.left = `${right}px`
          break
        case 'bottom':
          style.top = `${bottom}px`
          style.left = center.left
          break
        case 'left':
          style.top = center.top
          style.left = `${left}px`
          break
      }
      if (tooltipDelay) props.delay = parseInt(tooltipDelay)
      on()
    }
  }

  function hideTooltip() {
    if (!state.value) return
    off()
    requestAnimationFrame(() => {
      if (props && style) {
        props.delay = void 0
        props.side = void 0
        props.text = void 0
        style.top = void 0
        style.left = void 0
      }
    })
  }

  return () => {
    useRender(() => (
      <TooltipContent delay={props?.delay} state={state.value} side={props.side} style={style}>
        {props?.text}
      </TooltipContent>
    ))

    useDelegation({
      mouseover: showTooltip,
      mouseout: hideTooltip,
      focusin: showTooltip,
      focusout: hideTooltip
    })
  }
}

const useSingleTooltip = useSingleTooltipCreator()

const Tooltip = defineComponent({
  props: {
    delay: {
      type: Number,
      default: 200
    },
    disabled: Boolean,
    side: {
      type: String as PropType<TooltipProps['side']>,
      default: 'top'
    },
    text: String
  },
  setup(props, { slots }) {
    useSingleTooltip()

    return () => {
      if (!slots.default) return null

      const rendered = slots.default()

      if (!props.disabled) {
        rendered[0].props = mergeProps(rendered[0].props ?? {}, {
          'aria-describedby': 'v-tooltip',
          'data-tooltip-delay': props.delay,
          'data-tooltip-side': props.side,
          'data-tooltip-text': props.text
        })
      }

      return <>{rendered}</>
    }
  }
})

export default Tooltip
