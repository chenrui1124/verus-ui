<script lang="ts">
import type { Either, MaybeReadonly } from 'mm2r'

import { BaseIcon } from '@/base'

type NavigationPropsItemDefault = {
  text: string
  value: string
  icon?: string
}

type NavigationPropsItemGroup = {
  text: string
  group: NavigationPropsItemDefault[]
  open?: boolean
  icon?: string
}

type NavigationPropsItem = Either<NavigationPropsItemDefault, NavigationPropsItemGroup>

export interface NavigationProps {
  modelValue?: string
  items?: MaybeReadonly<NavigationPropsItem[]>
}
</script>

<script lang="ts" setup>
defineProps<Omit<NavigationProps, 'modelValue'>>()

const modelValue = defineModel<NavigationProps['modelValue']>()

const emit = defineEmits<{ push: [value: NavigationProps['modelValue']] }>()

function setModelValue(evt: MouseEvent) {
  const el = evt.target as HTMLElement
  const value = el.dataset.value
  if (value) emit('push', (modelValue.value = value))
}
</script>

<template>
  <nav
    v-if="items"
    @click="setModelValue"
    class="box-border grid grid-cols-[min-content_1fr_min-content] space-y-1 text-sm/loose text-on-sur select-none **:box-border"
  >
    <template v-for="(first, key) of items" :key>
      <div
        v-if="first.group"
        class="col-span-3 grid grid-cols-subgrid grid-rows-[min-content_0fr] transition-all duration-300 ease-braking has-checked:grid-rows-[min-content_1fr]"
      >
        <label
          class="peer col-span-3 grid h-8 cursor-pointer grid-cols-subgrid items-center rounded-v1 px-3 font-semibold text-otl transition duration-300 hover:bg-sur-var hover:text-inherit has-checked:text-inherit"
        >
          <input
            type="checkbox"
            :checked="first.open"
            class="peer pointer-events-none col-start-3 row-start-1 m-0 -mr-0.5 ml-1 i-[fluent--caret-right-24-filled] size-4 appearance-none p-0 text-inherit transition duration-300 ease-braking checked:rotate-90"
          />
          <span
            class="pointer-events-none col-start-2 row-start-1 transition duration-300 ease-braking peer-checked:-translate-x-6.25"
          >
            {{ first.text }}
          </span>
          <BaseIcon
            v-if="first.icon"
            :icon="first.icon"
            class="col-start-1 row-start-1 mr-2 -ml-0.5 transition duration-300 ease-braking peer-checked:scale-0"
          />
        </label>
        <div
          class="col-span-3 mt-0 ml-5 grid grid-cols-[min-content_1fr] space-y-1 overflow-y-hidden border-l border-l-otl-var pl-4 transition-all duration-300 peer-has-checked:mt-1"
        >
          <div
            v-for="(second, key) of first.group"
            :key
            :data-value="second.value"
            :class="[
              'col-span-2 grid h-8 cursor-pointer grid-cols-subgrid items-center rounded-v1 px-3 transition duration-300',
              modelValue === second.value
                ? 'pointer-events-none bg-pri-ctr text-pri'
                : 'text-otl hover:bg-sur-var hover:text-inherit'
            ]"
          >
            <BaseIcon v-if="second.icon" :icon="second.icon" class="col-start-1 mr-2 -ml-0.5" />
            <span class="pointer-events-none col-start-2 ml-px">{{ second.text }}</span>
          </div>
        </div>
      </div>
      <div
        v-else
        :data-value="first.value"
        :class="[
          'col-span-3 grid h-8 cursor-pointer grid-cols-subgrid items-center rounded-v1 px-3 transition duration-300',
          modelValue === first.value
            ? 'pointer-events-none bg-pri-ctr text-pri'
            : 'text-otl hover:bg-sur-var hover:text-inherit'
        ]"
      >
        <BaseIcon v-if="first.icon" :icon="first.icon" class="col-start-1 mr-2 -ml-0.5" />
        <span class="pointer-events-none col-start-2">{{ first.text }}</span>
      </div>
    </template>
  </nav>
</template>
