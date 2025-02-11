export const useHover = (() => {
  const startHooks: Set<Function> = new Set()
  const endHooks: Set<Function> = new Set()

  document.body.addEventListener('mouseover', (evt: MouseEvent) => {
    for (const hook of startHooks) hook(evt)
  })

  document.body.addEventListener('mouseout', (evt: MouseEvent) => {
    for (const hook of endHooks) hook(evt)
  })

  return (hook: { start?: (evt: MouseEvent) => void; end?: (evt: MouseEvent) => void }) => {
    if (hook.start) startHooks.add(hook.start)
    if (hook.end) endHooks.add(hook.end)

    const unregister = () => {
      if (hook.start) startHooks.delete(hook.start)
      if (hook.end) endHooks.delete(hook.end)
    }

    return unregister
  }
})()
