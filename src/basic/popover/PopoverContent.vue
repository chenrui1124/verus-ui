<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated } from 'vue'
import { useListener, useResize } from '@/composable'
import { disableScroll } from '@/utils'

defineOptions({ inheritAttrs: false })

const { disabled, hidePopover } = defineProps<{
  disabled?: boolean
  hidePopover: () => void
}>()

useListener({ keydown: () => hidePopover() })

useResize(() => hidePopover())

onMounted(() => disableScroll(true))

onUpdated(() => disabled && hidePopover())

onUnmounted(() => disableScroll(false))
</script>

<template>
  <div
    popover="manual"
    @click.self="hidePopover"
    class="inset-0 z-40 m-0 box-border size-full border-none bg-transparent p-0 transition duration-300"
  >
    <div
      :="$attrs"
      class="absolute box-border inline-flex flex-col rounded-v2 border border-solid border-otl-var bg-sur p-0.5 drop-shadow-sm transition duration-300 ease-braking"
    >
      <slot></slot>
    </div>
  </div>
</template>
