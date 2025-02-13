export const useHover = (() => {
  const startHooks: Set<Function> = new Set()
  const endHooks: Set<Function> = new Set()

  const onPointerover = (evt: PointerEvent) => startHooks.forEach(hook => hook(evt))
  const onPointerout = (evt: PointerEvent) => endHooks.forEach(hook => hook(evt))

  const enableCallback = () => {
    if (startHooks.size !== 0) document.body.addEventListener('pointerover', onPointerover)
    if (endHooks.size !== 0) document.body.addEventListener('pointerout', onPointerout)
  }
  const disableCallback = () => {
    requestIdleCallback(() => {
      if (startHooks.size === 0) document.body.removeEventListener('pointerover', onPointerover)
      if (endHooks.size === 0) document.body.removeEventListener('pointerout', onPointerout)
    })
  }

  return (hooks: { start?: (evt: PointerEvent) => void; end?: (evt: PointerEvent) => void }) => ({
    enable: () => {
      if (hooks.start && !startHooks.has(hooks.start)) startHooks.add(hooks.start)
      if (hooks.end && !endHooks.has(hooks.end)) endHooks.add(hooks.end)
      enableCallback()
    },
    disable: () => {
      if (hooks.start && startHooks.has(hooks.start)) startHooks.delete(hooks.start)
      if (hooks.end && endHooks.has(hooks.end)) endHooks.delete(hooks.end)
      disableCallback()
    }
  })
})()
