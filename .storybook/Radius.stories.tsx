import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const Radius: FunctionalComponent = () => (
  <div class='grid grid-cols-[min-content_1fr] gap-3 p-3 **:box-border [&>div]:border [&>div]:border-otl [&>div]:bg-sur-var'>
    <span>Lv1</span>
    <div class='h-8 w-20 rounded-v1'></div>
    <span>Lv2</span>
    <div class='h-9 w-24 rounded-v2'></div>
    <span>Lv3</span>
    <div class='h-32 w-48 rounded-v3'></div>
    <span>Lv4</span>
    <div class='h-60 w-96 rounded-v4'></div>
    <span>Full</span>
    <div class='h-7 w-12 rounded-full'></div>
  </div>
)

const meta: Meta = {
  title: 'Design/Radius',
  render() {
    return () => <Radius />
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
