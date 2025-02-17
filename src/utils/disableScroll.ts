const getScrollbarWidth = () => {
  const div = document.createElement('div')
  Object.assign(div.style, {
    width: '100%',
    height: '0',
    position: 'fixed',
    overflow: 'scroll'
  })
  document.body.appendChild(div)
  const scrollbarWidth = div.offsetWidth - div.clientWidth
  div.remove()
  return scrollbarWidth
}

export const disableScroll = (() => {
  let originalOverflow: string | undefined
  let originalPaddingRight: string | undefined

  return (newState: boolean | undefined) => {
    if (newState) {
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight

      const paddingRight = getComputedStyle(document.body).paddingRight
      const scrollbarWidth = getScrollbarWidth()

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `calc(${paddingRight} + ${scrollbarWidth}px)`
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
