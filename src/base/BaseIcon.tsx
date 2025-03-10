import type { FunctionalComponent, HTMLAttributes } from 'vue'
import type { SizeProp } from '@/ts'

import { Size } from '@/ts'
import { cn } from '@/utils'

interface BaseIconProps {
  class?: HTMLAttributes['class']
  icon: string
  /**
   * @default 'md' = 'size-5'
   */
  size?: SizeProp<Size.Sm | Size.Md | Size.Lg>
}

const BaseIcon: FunctionalComponent<BaseIconProps> = (
  { class: cv, icon, size = Size.Md },
  { attrs }
) => (
  <span
    {...attrs}
    aria-hidden='true'
    class={cn(
      icon,
      'pointer-events-none inline-block',
      {
        [Size.Sm]: 'size-4 min-h-4 min-w-4',
        [Size.Md]: 'size-5 min-h-5 min-w-5',
        [Size.Lg]: 'size-6 min-h-6 min-w-6'
      }[size],
      cv
    )}
  ></span>
)

BaseIcon.inheritAttrs = false

BaseIcon.props = ['class', 'icon', 'size']

export default BaseIcon
