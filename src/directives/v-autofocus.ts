import { nextTick, type ObjectDirective } from 'vue'

export const vAutofocus: ObjectDirective<HTMLElement> = {
  mounted(el, { value }) {
    if (value) nextTick(() => el.focus())
  }
}
