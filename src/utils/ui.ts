export const ui = (() => {
  const base = {
    outline: 'outline-pri/75 outline-offset-3 outline-2 outline-none'
  } as const

  const each = {
    cover_by_before:
      'before:pointer-events-none before:absolute before:inset-0 before:box-border before:rounded-[inherit]',
    outline_focus_visible: `focus-visible:outline-solid ${base.outline}`,
    outline_has_focus_visible: `has-focus-visible:outline-solid ${base.outline}`
  } as const

  return <T extends keyof typeof each>(...args: T[]): (typeof each)[T][] =>
    args.map(arg => each[arg])
})()
