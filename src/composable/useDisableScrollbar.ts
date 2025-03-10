import { getCurrentScope, onScopeDispose } from 'vue'

export const useDisableScrollbar = (() => {
  let scrollbarWidth: string

  const getScrollbarWidth = () => {
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.style.width = '100%'
    div.style.height = '0'
    div.style.overflow = 'scroll'
    document.body.appendChild(div)
    const scrollbarWidth = div.offsetWidth - div.clientWidth
    div.remove()
    return `${scrollbarWidth}px`
  }

  return () => {
    if (!getCurrentScope()) return
    const { clientHeight, scrollHeight } = document.documentElement
    if (clientHeight >= scrollHeight) return

    if (!scrollbarWidth) scrollbarWidth = getScrollbarWidth()

    const { overflow, paddingRight } = document.body.style
    const computedPaddingRight = getComputedStyle(document.body).paddingRight
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `calc(${computedPaddingRight} + ${scrollbarWidth})`

    onScopeDispose(() => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    })
  }
})()
