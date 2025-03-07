import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const Heading: FunctionalComponent = (_, { slots }) => (
  <h1 class='m-0 p-0 text-xl/tight'>{slots.default?.()}</h1>
)

const Group: FunctionalComponent = (_, { slots }) => (
  <div class='col-span-4 grid h-32 grid-cols-subgrid *:relative *:p-1'>{slots.default?.()}</div>
)

const Aa: FunctionalComponent = () => (
  <div class='absolute inset-0 flex items-center justify-center text-3xl'>Aa</div>
)

const Colors: FunctionalComponent = () => {
  return (
    <div class='grid grid-cols-4 p-6 text-sm text-on-sur *:p-3 *:font-normal'>
      <Heading>Surface</Heading>
      <Group>
        <div class='bg-sur'>
          Surface / On Surface
          <Aa />
        </div>
        <div class='bg-sur-var'>
          Surface Variant
          <Aa />
        </div>
      </Group>

      <Heading>Primary</Heading>
      <Group>
        <div class='bg-pri text-on-pri'>
          Primary / On Primary <Aa />
        </div>
        <div class='bg-pri-var text-on-pri-var'>
          Primary Variant / On Primary Variant <Aa />
        </div>
        <div class='bg-pri-ctr text-pri'>
          Primary Container
          <Aa />
        </div>
      </Group>

      <Heading>Success</Heading>
      <Group>
        <div class='bg-suc text-suc-ctr'>
          Success
          <Aa />
        </div>
        <div class='bg-suc-ctr text-suc'>
          Success Container
          <Aa />
        </div>
      </Group>

      <Heading>Warning</Heading>
      <Group>
        <div class='bg-wan text-wan-ctr'>
          Warning
          <Aa />
        </div>
        <div class='bg-wan-ctr text-wan'>
          Warning Container
          <Aa />
        </div>
      </Group>

      <Heading>Error</Heading>
      <Group>
        <div class='bg-err text-on-err'>
          Error <Aa />
        </div>
        <div class='bg-err-var text-on-err-var'>
          Error Variant <Aa />
        </div>
        <div class='bg-err-ctr text-on-err-ctr'>
          Error Container <Aa />
        </div>
      </Group>

      <Heading>Border</Heading>
      <Group>
        <div class='bg-otl'>Border</div>
        <div class='bg-otl-var'>Border Variant</div>
      </Group>

      <Heading>Disabled</Heading>
      <Group>
        <div class='bg-dis text-on-dis'>
          Disabled / On Disabled
          <Aa />
        </div>
      </Group>
    </div>
  )
}

const meta: Meta = {
  title: 'Design/Colors',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div class='h-screen w-screen bg-sur'>
      <Colors />
    </div>
  )
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
