<script lang="ts">
import { reactive } from 'vue'
import { vResizeObserver } from '@/directives'

export interface HorizontalScrollingProps {
  /**
   * @default 'auto'
   */
  height?: string
  /**
   * @default 'auto'
   */
  width?: string
}
</script>

<script lang="ts" setup>
const { width = 'auto', height = 'auto' } = defineProps<HorizontalScrollingProps>()

const size = reactive({ height: '', width: '' })

function onResize(entry: ResizeObserverEntry) {
  const rect = entry.contentRect
  size.width = `${rect.height}px`
  size.height = `${rect.width}px`
}
</script>

<template>
  <div v-resize-observer="onResize" :style="{ width, height }" class="box-border overflow-hidden">
    <div
      :style="{ ...size, transform: `translateY(${size.width}) rotate(-90deg)` }"
      class="relative origin-top-left overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:w-0"
    >
      <div
        :style="{ height: size.width }"
        class="absolute left-full flex origin-top-left rotate-90 flex-nowrap *:max-w-none"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
