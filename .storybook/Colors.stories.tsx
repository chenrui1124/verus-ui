import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const Colors: FunctionalComponent = () => (
  <div class='grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] text-xl *:h-32 *:p-3'>
    <div class='bg-sur text-on-sur'>Surface</div>
    <div class='bg-sur-var text-on-sur'>Surface Variant</div>

    <div class='bg-otl text-on-sur'>Border</div>
    <div class='bg-otl-var text-on-sur'>Border Variant</div>

    <div class='bg-pri text-on-pri'>Primary</div>
    <div class='bg-pri-var text-on-pri-var'>Primary Variant</div>
    <div class='bg-pri-ctr text-pri'>Primary Container</div>
    <div class='bg-err text-on-err'>Error</div>
    <div class='bg-err-var text-on-err-var'>Error Variant</div>
    <div class='bg-err-ctr text-on-err-ctr'>Error Container</div>
    <div class='bg-suc-ctr text-on-suc-ctr'>Success Container</div>
    <div class='bg-wan-ctr text-on-wan-ctr'>Warning Container</div>

    <div class='bg-dis text-on-dis'>Disabled</div>
  </div>
)

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
