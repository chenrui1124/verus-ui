export const useUi = (() => {
  const ui = {
    cover_by_before:
      'before:pointer-events-none before:absolute before:inset-0 before:box-border before:rounded-[inherit]',
    ring_when_focus_visible: 'outline-none focus-visible:ring-3 focus-visible:ring-pri/50',
    ring_when_has_focus_visible: 'has-focus-visible:ring-3 has-focus-visible:ring-pri/50'
  } as const

  return <T extends keyof typeof ui>(...args: T[]): (typeof ui)[T][] => args.map(arg => ui[arg])
})()
