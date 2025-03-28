import type { HTMLAttributes } from 'vue'

export namespace Aria {
  export interface CollapsibleTrigger
    extends Pick<HTMLAttributes, 'id' | 'aria-controls' | 'aria-expanded'> {}

  export interface DropdownTrigger extends CollapsibleTrigger {
    'aria-haspopup': 'menu'
  }

  export interface DialogTrigger extends CollapsibleTrigger {
    'aria-haspopup': 'dialog'
  }
}
