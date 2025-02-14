import type { PropType } from 'vue'
import type { SideProp } from '@/ts'

import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useSingleTooltip } from './useSingleTooltip'

export interface TooltipProps {
  disabled?: boolean
  /**
   * @default 'top'
   */
  side?: SideProp
  text?: string
}

const Tooltip = defineComponent({
  props: {
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
        rendered[0].props = {
          ...(rendered[0].props ?? {}),
          'data-tooltip-side': props.side,
          'data-tooltip-text': props.text
        }
      }

      return <>{rendered}</>
    }
  }
})

export default Tooltip
