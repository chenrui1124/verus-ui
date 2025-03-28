<script lang="ts">
import { BaseIcon } from '@/base'
import { ui } from '@/utils'

interface NavigationLinkProps {
  arrow?: boolean
  icon?: string
  selected?: boolean
  value?: string
}
</script>

<script lang="ts" setup>
defineProps<NavigationLinkProps>()
</script>

<template>
  <button
    :aria-selected="value ? selected : void 0"
    :data-value="value"
    :class="[
      'grid h-9 grid-cols-subgrid items-center rounded-v2 border-none px-5 text-left tracking-wide text-inherit transition duration-200',
      arrow ? 'group/nav-control' : 'cursor-pointer',
      selected ? 'bg-pri-ctr/75 text-pri' : 'bg-transparent hover:bg-sur-var/50 hover:text-on-sur',
      ui('outline_focus_visible')
    ]"
  >
    <BaseIcon
      v-if="icon"
      :icon
      :class="[
        'col-start-1 mr-2 -ml-1 transition duration-300 ease-braking',
        arrow && 'group-aria-expanded/nav-control:scale-0'
      ]"
    />
    <span
      :class="[
        'pointer-events-none col-start-2 mx-1 text-sm/6 transition duration-300 ease-braking',
        arrow &&
          'group-aria-expanded/nav-control:-translate-x-7.25 group-aria-expanded/nav-control:text-on-sur'
      ]"
    >
      <slot></slot>
    </span>
    <BaseIcon
      v-if="arrow"
      icon="i-[fluent--caret-right-24-filled]"
      size="sm"
      class="col-start-3 -mr-1 ml-1 transition duration-300 ease-braking group-aria-expanded/nav-control:rotate-90"
    />
  </button>
</template>
