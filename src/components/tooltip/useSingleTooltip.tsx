import type { Reactive } from 'vue'
import type { TooltipProps } from '.'

import { reactive } from 'vue'
import { useRender, useSwitch } from '@/composable'
import { useHover } from '@/utils'
import TooltipContent from './TooltipContent.vue'

export const useSingleTooltip = (() => {
  let count = 0
  let props: Reactive<Pick<TooltipProps, 'side' | 'text'>> | null = null
  let coord: Reactive<{ x?: string; y?: string }> | null = null
  let destroy: (() => void) | null = null

  const register = () => {
    if (!count) {
      props = reactive({})
      coord = reactive({})
      const { state, on, off } = useSwitch()

      destroy = useRender(() => (
        <TooltipContent
          state={state.value}
          side={props?.side}
          style={{
            top: coord?.y,
            left: coord?.x
          }}
        >
          {props?.text}
        </TooltipContent>
      ))

      useHover({
        start: evt => {
          const el = evt.target as HTMLElement
          const { tooltipSide, tooltipText } = el.dataset
          if (
            tooltipSide &&
            tooltipText &&
            ['top', 'right', 'bottom', 'left'].includes(tooltipSide) &&
            props &&
            coord
          ) {
            props.side = tooltipSide as TooltipProps['side']
            props.text = tooltipText
            const { top, right, bottom, left } = el.getBoundingClientRect()
            const center = {
              top: `${(top + bottom) / 2}px`,
              left: `${(right + left) / 2}px`
            }
            switch (tooltipSide) {
              case 'top':
                coord.y = `${top}px`
                coord.x = center.left
                break
              case 'right':
                coord.y = center.top
                coord.x = `${right}px`
                break
              case 'bottom':
                coord.y = `${bottom}px`
                coord.x = center.left
                break
              case 'left':
                coord.y = center.top
                coord.x = `${left}px`
                break
            }
            on()
          }
        },
        end: () => {
          if (!state.value) return
          off()
          requestAnimationFrame(() => {
            if (props && coord) {
              props.side = void 0
              props.text = void 0
              coord.x = void 0
              coord.y = void 0
            }
          })
        }
      })
    }
    count++
  }

  const unregister = () => {
    count--
    if (count === 0) {
      props = coord = null
      destroy?.()
    }
  }

  return () => ({ register, unregister })
})()
