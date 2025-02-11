import type { FunctionalComponent, HTMLAttributes } from 'vue'

import { cn } from '@/utils'

interface IconProps extends Pick<HTMLAttributes, 'class'> {
  icon: string
}

const Icon: FunctionalComponent<IconProps> = ({ class: cv, icon }, { attrs }) => (
  <span
    {...attrs}
    class={cn(icon, 'pointer-events-none inline-block', cv as Parameters<typeof cn>)}
  ></span>
)

Icon.inheritAttrs = false

Icon.props = ['class', 'icon']

export default Icon
