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

export const disableScroll = (() => {
  let originalOverflow: string | undefined
  let originalPaddingRight: string | undefined
  let scrollbarWidth: string

  return (disabled: boolean | undefined) => {
    if (disabled) {
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight

      const paddingRight = getComputedStyle(document.body).paddingRight
      if (!scrollbarWidth) scrollbarWidth = getScrollbarWidth()

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `calc(${paddingRight} + ${scrollbarWidth})`
    } else {
      if (typeof originalOverflow === 'string') {
        document.body.style.overflow = originalOverflow
        originalOverflow = void 0
      }
      if (typeof originalPaddingRight === 'string') {
        document.body.style.paddingRight = originalPaddingRight
        originalPaddingRight = void 0
      }
    }
  }
})()
