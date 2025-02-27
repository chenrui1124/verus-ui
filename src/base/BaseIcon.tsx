import type { FunctionalComponent, HTMLAttributes } from 'vue'

import { cn } from '@/utils'

interface BaseIconProps {
  class?: HTMLAttributes['class']
  icon: string
}

const BaseIcon: FunctionalComponent<BaseIconProps> = ({ class: cv, icon }, { attrs }) => (
  <span {...attrs} class={cn(icon, 'pointer-events-none inline-block', cv)} />
)

BaseIcon.inheritAttrs = false

BaseIcon.props = ['class', 'icon']

export default BaseIcon
