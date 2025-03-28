<script lang="ts">
import type { Either, MaybeReadonly } from 'mm2r'

import { computed, useId } from 'vue'
import NavigationLink from './NavigationLink.vue'

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
  items: MaybeReadonly<NavigationPropsItem[]>
}
</script>

<script lang="ts" setup>
const { items } = defineProps<Omit<NavigationProps, 'modelValue'>>()

const modelValue = defineModel<NavigationProps['modelValue']>()

const emit = defineEmits<{ push: [value: string] }>()

const itemsWithAria = computed(() =>
  items.map(item => {
    if (item.group) {
      const controlId = useId()
      const regionId = useId()
      return {
        ...item,
        controlId,
        regionId
      }
    }
    return item
  })
)

function onClick(evt: MouseEvent) {
  const el = evt.target as HTMLElement
  if (el.hasAttribute('data-value')) {
    const value = el.dataset.value
    if (modelValue.value !== value) modelValue.value = el.dataset.value
    if (value) emit('push', value)
  }
  if (el.ariaExpanded) {
    el.ariaExpanded = el.ariaExpanded === 'true' ? 'false' : 'true'
  }
}
</script>

<template>
  <ul
    @click="onClick"
    class="m-0 grid list-none grid-cols-[min-content_1fr_min-content] space-y-1 p-0 text-on-sur/80"
  >
    <template v-for="(fl, fIndex) of itemsWithAria" :key="fIndex">
      <li
        v-if="fl.group"
        class="col-span-3 row-span-2 grid grid-cols-subgrid transition-all duration-300 ease-braking not-has-aria-expanded:grid-rows-[min-content_0fr] has-aria-expanded:grid-rows-[min-content_1fr]"
      >
        <NavigationLink
          :id="fl.controlId"
          :aria-controls="fl.regionId"
          :aria-expanded="!!fl.open"
          arrow
          :icon="fl.icon"
          class="col-span-3"
        >
          {{ fl.text }}
        </NavigationLink>
        <div
          :id="fl.regionId"
          role="region"
          :aria-labelledby="fl.controlId"
          class="col-span-3 grid grid-cols-[min-content_1fr] overflow-hidden"
        >
          <ul class="col-span-3 m-0 grid list-none grid-cols-subgrid p-1">
            <li
              v-for="(sl, sIndex) of fl.group"
              :key="sIndex"
              :class="[
                'col-span-2 ml-6.5 grid grid-cols-subgrid border-l py-0.5 pl-1.5 transition duration-200',
                modelValue === sl.value ? 'border-pri' : 'border-otl-var'
              ]"
            >
              <NavigationLink
                :icon="sl.icon"
                :selected="modelValue === sl.value"
                :value="sl.value"
                class="col-span-2"
              >
                {{ sl.text }}
              </NavigationLink>
            </li>
          </ul>
        </div>
      </li>
      <li v-else class="col-span-3 grid grid-cols-subgrid">
        <NavigationLink
          :icon="fl.icon"
          :selected="modelValue === fl.value"
          :value="fl.value"
          class="border-l-solid col-span-3 border-l"
        >
          {{ fl.text }}
        </NavigationLink>
      </li>
    </template>
  </ul>
</template>
