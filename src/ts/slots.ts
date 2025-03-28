import type { HTMLAttributes } from 'vue'

export namespace Aria {
  export interface CollapsibleTrigger
    extends Pick<HTMLAttributes, 'id' | 'aria-expanded' | 'aria-labelledby'> {}

  export interface DropdownTrigger
    extends Pick<HTMLAttributes, 'id' | 'aria-controls' | 'aria-expanded'> {
    'aria-haspopup': 'menu'
  }

  export interface DialogTrigger
    extends Pick<HTMLAttributes, 'id' | 'aria-controls' | 'aria-expanded'> {
    'aria-haspopup': 'dialog'
  }
}
