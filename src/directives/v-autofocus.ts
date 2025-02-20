import type { ObjectDirective } from 'vue'

import { nextTick } from 'vue'

export const vAutofocus: ObjectDirective<HTMLElement> = {
  mounted(el, { value }) {
    if (value) nextTick(() => el.focus())
  }
}
