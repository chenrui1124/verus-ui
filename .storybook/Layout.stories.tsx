import type { FunctionalComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  parameters: { layout: 'centered' },
  title: 'Design/Layout'
}

export default meta

type Story = StoryObj<typeof meta>

const TmplIcon = (_: { class?: string }) => <div class='size-5 bg-sur-var'></div>

const TmplText = (_: { class?: string }) => <div class='h-5 w-14 bg-sur-var'></div>

const TmplItem: FunctionalComponent = (_, { slots }) => (
  <div class='inline-flex h-8 items-center justify-center gap-1 rounded-v1 border border-otl-var px-3.75'>
    {slots.default?.()}
  </div>
)

const TmplTrigger: FunctionalComponent = (_, { slots }) => (
  <div class='inline-flex h-9 items-center justify-center gap-3 rounded-v2 border border-otl-var px-4'>
    {slots.default?.()}
  </div>
)

export const Item: Story = {
  render: () => (
    <div class='flex flex-col items-baseline gap-3'>
      <TmplItem>
        <TmplText />
      </TmplItem>
      <TmplItem>
        <TmplIcon class='mr-0.5 -ml-1.5' />
        <TmplText />
      </TmplItem>
    </div>
  )
}

export const Trigger: Story = {
  render: () => (
    <div class='flex flex-col items-baseline gap-3'>
      <TmplTrigger>
        <TmplText />
      </TmplTrigger>
      <TmplTrigger>
        <TmplIcon class='-mx-1' />
        <TmplText />
      </TmplTrigger>
      <TmplTrigger>
        <TmplText />
        <TmplIcon class='-mx-1' />
      </TmplTrigger>
      <TmplTrigger>
        <TmplIcon class='-mx-1' />
        <TmplText />
        <TmplIcon class='-mx-1' />
      </TmplTrigger>
    </div>
  )
}

export const Dropdown: Story = {
  render: () => (
    <div class='flex flex-col'>
      <TmplTrigger />
      <div class='-mx-1 my-1 w-40 rounded-v3 border border-otl-var bg-sur p-0.5 drop-shadow-xs'>
        <div class='flex flex-col gap-1 p-1.5'>
          {Array.from({ length: 7 }).map(() => (
            <div class='h-8 rounded-v1 bg-sur-var'></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Card: Story = {
  render: () => (
    <div class='box-content w-96 rounded-v4 border border-otl-var bg-sur p-0'>
      <div class='box-border flex flex-col gap-3 rounded-[inherit] p-6 **:box-border'>
        <div class='box-border h-7 bg-sur-var text-xl text-pri'></div>
        <div class='h-5 bg-sur-var text-sm text-otl'></div>
        <div class='h-40 bg-sur-var text-sm/loose'></div>
        <div class='box-border flex h-9 justify-end gap-3 bg-sur-var'>
          <div class='h-full w-16 rounded-v2 border border-otl-var bg-otl-var'></div>
          <div class='h-full w-16 rounded-v2 border border-otl-var bg-otl-var'></div>
        </div>
      </div>
    </div>
  )
}
