import type { Reactive } from 'vue'
import type { TooltipProps } from '.'

import { reactive } from 'vue'
import { useListener, useRender, useSwitch } from '@/composable'
import TooltipContent from './TooltipContent.vue'

export const useSingleTooltip = (() => {
  let props: Reactive<Pick<TooltipProps, 'side' | 'text'>> | null = null
  let coord: Reactive<{ x?: string; y?: string }> | null = null

  const { state, on, off } = useSwitch()

  const { inc, dec } = useRender(
    () => (
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
    ),
    {
      mounted: () => {
        props = reactive({})
        coord = reactive({})
      },
      unmounted: () => {
        props = coord = null
      }
    }
  )

  return () => {
    useListener(
      {
        pointerover: evt => {
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
            const center = { y: `${(top + bottom) / 2}px`, x: `${(right + left) / 2}px` }
            switch (tooltipSide) {
              case 'top':
                coord.x = center.x
                coord.y = `${top}px`
                break
              case 'right':
                coord.x = `${right}px`
                coord.y = center.y
                break
              case 'bottom':
                coord.x = center.x
                coord.y = `${bottom}px`
                break
              case 'left':
                coord.x = `${left}px`
                coord.y = center.y
                break
            }
            on()
          }
        },
        pointerout: () => {
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
      },
      { mounted: inc, unmounted: dec }
    )
  }
})()
