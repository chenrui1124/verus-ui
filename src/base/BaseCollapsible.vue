<script lang="ts">
import type { Aria } from '@/ts'

import { computed, useId } from 'vue'
import { useSwitch } from '@/composable'

interface BaseCollapsibleProps {
  open?: boolean
}

interface BaseCollapsibleSlots {
  trigger?(props: { aria: Aria.Collapsible; state: boolean; toggle: () => void }): void
  default?(): void
}
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const { open } = defineProps<BaseCollapsibleProps>()

const { state, toggle } = useSwitch({ modelValue: open })

const emit = defineEmits<{ switch: [state: boolean] }>()

const hook = () => emit('switch', state.value)

const regionId = useId()

const controllerId = useId()

const aria = computed(() => ({
  id: controllerId,
  'aria-controls': regionId,
  'aria-expanded': state.value
}))

defineSlots<BaseCollapsibleSlots>()
</script>

<template>
  <slot name="trigger" :="{ aria, state, toggle }"></slot>

  <div :id="regionId" role="region" :aria-labelledby="controllerId" class="box-border">
    <Transition
      @before-enter="hook"
      @after-leave="hook"
      enter-from-class="grid-rows-[0fr]"
      enter-active-class="transition-all duration-500 ease-braking"
      enter-to-class="grid-rows-[1fr]"
      leave-from-class="grid-rows-[1fr]"
      leave-active-class="transition-all duration-500 ease-braking"
      leave-to-class="grid-rows-[0fr]"
    >
      <div
        v-if="state"
        :="$attrs"
        class="grid-col-1 box-border grid rounded-[inherit] transition duration-300"
      >
        <div class="box-border overflow-hidden rounded-[inherit]">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
