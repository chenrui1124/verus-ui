<script lang="ts">
import { cn } from '@/utils'
import { HTMLAttributes } from 'vue'

interface BaseBackdropProps {
  class?: HTMLAttributes['class']
  state?: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<BaseBackdropProps>()
</script>

<template>
  <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="props.state"
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none fixed inset-0 z-30 bg-on-sur/20 backdrop-blur-sm transition duration-500',
          props.class
        )
      "
    ></div>
  </Transition>
</template>
