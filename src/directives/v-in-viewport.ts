import type { ObjectDirective } from 'vue'

type vInViewportValue = (el: HTMLElement, isIntersecting: boolean) => void

type vInViewportHost = HTMLElement & { $$intersectionObserverCallback?: vInViewportValue }

export const vInViewport: ObjectDirective<vInViewportHost, vInViewportValue> = (() => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(
      entry =>
        void (entry.target as vInViewportHost)?.$$intersectionObserverCallback?.(
          entry.target as HTMLElement,
          entry.isIntersecting
        )
    )
  })

  return {
    mounted(el, { value }) {
      io.observe(el)
      el.$$intersectionObserverCallback = value
    },
    unmounted(el) {
      io.unobserve(el)
      delete el.$$intersectionObserverCallback
    }
  }
})()
