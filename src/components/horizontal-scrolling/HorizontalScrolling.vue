<script lang="ts">
import { reactive } from 'vue'
import { vResizeObserver } from '@/directives'

export interface HorizontalScrollingProps {
  /**
   * @default 'auto'
   */
  uiWidth?: string
  /**
   * @default 'auto'
   */
  uiHeight?: string
}
</script>

<script lang="ts" setup>
const { uiWidth = 'auto', uiHeight = 'auto' } = defineProps<HorizontalScrollingProps>()

const containerStyle = reactive({
  height: '',
  width: ''
})

function onResize(entry: ResizeObserverEntry) {
  const { width, height } = entry.contentRect
  containerStyle.width = `${height}px`
  containerStyle.height = `${width}px`
}
</script>

<template>
  <div
    v-resize-observer="onResize"
    :style="{
      width: uiWidth,
      height: uiHeight
    }"
    class="overflow-y-hidden"
  >
    <div
      :style="{
        ...containerStyle,
        transform: `translateY(${containerStyle.width}) rotate(-90deg)`
      }"
      class="relative origin-top-left overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:w-0"
    >
      <div
        :style="{ height: containerStyle.width }"
        class="absolute left-full flex origin-top-left rotate-90 flex-nowrap"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
