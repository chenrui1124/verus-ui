import type { PositionProp } from '@verus-ui/ts'

import { useInstall } from '@verus-ui/common'
import Tooltip from './Tooltip'

export interface TooltipProps {
  label: string
  position?: PositionProp
}

export interface TooltipSlots {
  default(): void
}

export const VTooltip = useInstall(
  Tooltip as unknown as new () => {
    $props: TooltipProps
    $slots: TooltipSlots
  }
)
