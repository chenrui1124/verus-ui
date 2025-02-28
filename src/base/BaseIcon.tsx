import type { FunctionalComponent, HTMLAttributes } from 'vue'
import type { SizeProp } from '@/ts'

import { cn } from '@/utils'

interface BaseIconProps {
  class?: HTMLAttributes['class']
  icon: string
  /**
   * @default 'sm' = 'size-5'
   */
  size?: SizeProp<'sm' | 'md'>
}

const BaseIcon: FunctionalComponent<BaseIconProps> = (
  { class: cv, icon, size = 'sm' },
  { attrs }
) => (
  <span
    {...attrs}
    class={cn(
      icon,
      'pointer-events-none inline-block',
      {
        sm: 'size-5 min-h-5 min-w-5',
        md: 'size-6 min-h-6 min-w-6'
      }[size],
      cv
    )}
  />
)

BaseIcon.inheritAttrs = false

BaseIcon.props = ['class', 'icon', 'size']

export default BaseIcon
