<script lang="ts" setup>
import type { SizeProp } from '@/ts'

import { useAttrs } from 'vue'
import { cn } from '@/utils'

defineOptions({ inheritAttrs: false })

const { uiSize = 'md' } = defineProps<{ icon: string; uiSize?: SizeProp }>()

const { class: cv, ...others } = useAttrs()
</script>

<template>
  <span
    :class="
      cn(
        icon,
        'pointer-events-none inline-block',
        { sm: '', md: '', lg: '' }[uiSize],
        cv as Parameters<typeof cn>
      )
    "
    :="others"
  ></span>
</template>
