<script lang="ts">
import { computed, useId } from 'vue'

interface AriaIdSlots {
  default?(props: {
    controlsProps: {
      id: string
      'aria-controls': string
    }
    labelledbyProps: {
      id: string
      'aria-labelledby': string
    }
  }): any
}
</script>

<script lang="ts" setup>
defineSlots<AriaIdSlots>()

const controlsId = useId()

const labelledbyId = useId()

const controlsProps = computed(() => ({
  id: controlsId,
  'aria-controls': labelledbyId
}))

const labelledbyProps = computed(() => ({
  id: labelledbyId,
  'aria-labelledby': controlsId
}))
</script>

<template>
  <slot :="{ controlsProps, labelledbyProps }"></slot>
</template>
