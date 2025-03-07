import type { FunctionalComponent, HTMLAttributes } from 'vue'

import { cn } from '@/utils'

interface BaseBackdropProps {
  class?: HTMLAttributes['class']
}

const BaseBackdrop: FunctionalComponent<BaseBackdropProps> = ({ class: cv }) => (
  <div
    role='backdrop'
    aria-hidden='true'
    class={cn(
      'pointer-events-none fixed inset-0 z-30 bg-on-sur/30 backdrop-blur-sm transition duration-500',
      cv
    )}
  />
)

BaseBackdrop.props = ['class']

export default BaseBackdrop
