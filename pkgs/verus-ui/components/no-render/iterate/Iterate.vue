<script setup lang="ts" generic="T">
import type { IterateProps } from '.'

import { withPrefix } from '@verus-ui/common'
import { computed, ref } from 'vue'

defineOptions({ name: withPrefix('Iterate') })

const { each, init = 0 } = defineProps<IterateProps<T>>()

const index = ref<number>(init < each.length && init >= 0 ? init : 0)

const item = computed<T>(() => each[index.value])

const emit = defineEmits<{ next: [item: T] }>()

function next() {
  requestAnimationFrame(() => {
    index.value = (index.value + 1) % each.length
    emit('next', item.value)
  })
}

defineSlots<{
  default(props: { item: T; index: number; next: typeof next }): any
}>()
</script>

<template>
  <slot v-bind="{ index, item, next }"></slot>
</template>
