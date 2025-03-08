<script lang="ts">
import { useId } from 'vue'

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
const controlsId = useId()

const labelledbyId = useId()

defineSlots<AriaIdSlots>()
</script>

<template>
  <slot
    :="{
      controlsProps: { id: controlsId, 'aria-controls': labelledbyId },
      labelledbyProps: { id: labelledbyId, 'aria-labelledby': controlsId }
    }"
  ></slot>
</template>
