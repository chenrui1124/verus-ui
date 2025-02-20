import type { FunctionDirective } from 'vue'

export const vFocus: FunctionDirective<HTMLElement> = (el, { value }) => {
  if (value) el.focus()
}
