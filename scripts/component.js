import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const compsRootDir = resolve(import.meta.dirname, '../src/components')

const input = process.argv[2]

if (!input) {
  console.log('Need a component name.')
  process.exit(9)
}

const kebabCompName = input
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_/-]+/g, '-')
  .toLowerCase()

const pascalCompName = kebabCompName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join('')

const compDir = resolve(compsRootDir, kebabCompName)

if (existsSync(compDir)) {
  if (readdirSync(compDir).length !== 0) {
    console.log('Component already exists.')
    process.exit(9)
  }
} else {
  mkdirSync(compDir)
}

const component = `\
<script lang='ts'>
export interface ${pascalCompName}Props {

}
</script>

<script lang='ts' setup>
const {} = defineProps<${pascalCompName}Props>()
</script>

<template>

</template>
`

const stories = `\
import type { Meta, StoryObj } from '@storybook/vue3'

import { V${pascalCompName} } from '.'

const meta: Meta<typeof V${pascalCompName}> = {
  title: 'Components/${pascalCompName}',
  component: V${pascalCompName},
  argTypes: {},
  args: {},
  render(args) {
    return () => <V${pascalCompName} {...args}></V${pascalCompName}>
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
`

const index = `\
export type * from './${pascalCompName}.vue'

export { default as V${pascalCompName} } from './${pascalCompName}.vue'
`

writeFileSync(resolve(compDir, `${pascalCompName}.vue`), component)

writeFileSync(resolve(compDir, `${pascalCompName}.stories.tsx`), stories)

writeFileSync(resolve(compDir, 'index.ts'), index)

const indexFile = readFileSync(resolve(compsRootDir, 'index.ts'), 'utf-8')

const lines = indexFile.split('\n').filter(line => line !== '')

lines.push(`export * from './${kebabCompName}'`)

lines.sort()

lines.push('')

writeFileSync(resolve(compsRootDir, 'index.ts'), lines.join('\n'))

console.log('Component created successfully.')
