<script lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/utils'

interface BaseBackdropProps {
  class?: HTMLAttributes['class']
  state?: boolean
}
</script>

<script lang="ts" setup>
defineProps<BaseBackdropProps>()
</script>

<template>
  <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="state"
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none fixed inset-0 z-30 bg-on-sur/20 backdrop-blur-sm transition duration-500',
          $props.class
        )
      "
    ></div>
  </Transition>
</template>
