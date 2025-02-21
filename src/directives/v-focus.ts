import type { ObjectDirective } from 'vue'

import { nextTick } from 'vue'

export const vFocus: ObjectDirective<HTMLElement> = {
  mounted(el, { value }) {
    if (value) nextTick(() => el.focus())
  },
  updated(el, { value }) {
    if (value) el.focus()
  }
}
