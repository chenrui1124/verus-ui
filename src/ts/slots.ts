import type { HTMLAttributes } from 'vue'

export namespace Aria {
  export interface Collapsible
    extends Pick<HTMLAttributes, 'id' | 'aria-expanded' | 'aria-labelledby'> {}
}
