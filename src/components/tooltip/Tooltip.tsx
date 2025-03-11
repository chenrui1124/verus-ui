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

export interface TooltipSlots {
  default?(): any
}

const useSingleTooltip = (() => {
  const props = reactive<Partial<Pick<TooltipProps, 'delay' | 'side' | 'text'>>>({})
  const style = reactive<{ top?: string; left?: string }>({})
  let id: string

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
      el.setAttribute('aria-describedby', id)

      on()
    }
  }

  function hideTooltip(evt: Event) {
    if (!state.value) return

    const el = evt.target as HTMLElement

    off()

    for (const key of Object.keys(el.dataset)) {
      if (key.startsWith('tooltip')) {
        el.removeAttribute('aria-describedby')
        break
      }
    }
  }

  const TooltipContentWrapper = () => (
    <TooltipContent
      ref={el => (id = (el as InstanceType<typeof TooltipContent>).id)}
      delay={props.delay}
      side={props.side}
      state={state.value}
      text={props.text}
      style={style}
    >
      {props?.text}
    </TooltipContent>
  )

  return () => {
    useDelegation({
      mouseover: showTooltip,
      mouseout: hideTooltip,
      focusin: showTooltip,
      focusout: hideTooltip
    })

    useRender(TooltipContentWrapper)
  }
})()

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
