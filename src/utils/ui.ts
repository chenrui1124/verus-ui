export const ui = (() => {
  const base = {
    outline: 'outline-pri/75 outline-offset-3'
  }

  const each = {
    cover_by_before:
      'before:pointer-events-none before:absolute before:inset-0 before:box-border before:rounded-[inherit]',
    outline_focus_visible: `focus-visible:outline-2 ${base.outline}`,
    outline_has_focus_visible: `has-focus-visible:outline-2 ${base.outline}`
  } as const

  return <T extends keyof typeof each>(...args: T[]): (typeof each)[T][] =>
    args.map(arg => each[arg])
})()
