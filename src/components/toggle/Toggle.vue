<script lang="ts">
import { computed } from 'vue'
import { Icon } from '@/basic'
import { useSwitch } from '@/composable'
import { cn, ui } from '@/utils'

export interface ToggleProps {
  modelValue?: boolean
  fallbackIcon?: string
  disabled?: boolean
  icon?: string
  rounded?: boolean
}
</script>

<script lang="ts" setup>
const { fallbackIcon, icon } = defineProps<Omit<ToggleProps, 'modelValue'>>()

const modelValue = defineModel<ToggleProps['modelValue']>()

const { state, toggle } = useSwitch({ modelValue })

const rendedIcon = computed(() => (fallbackIcon ? (state.value ? icon : fallbackIcon) : icon))
</script>

<template>
  <button
    @click="toggle"
    :disabled
    :class="
      cn(
        ui('outline_focus_visible'),
        'relative box-border h-10 cursor-pointer border-none bg-transparent p-2 transition duration-300 **:box-border disabled:cursor-not-allowed disabled:text-dis',
        rounded ? 'rounded-full' : 'rounded-v2',
        state ? 'bg-pri/10 text-pri disabled:bg-dis/30' : 'text-otl enabled:hover:bg-on-sur/5'
      )
    "
  >
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      leave-active-class="absolute"
    >
      <Icon
        v-if="rendedIcon"
        :icon="rendedIcon"
        :key="rendedIcon"
        class="size-6 transition duration-300"
      />
    </Transition>
  </button>
</template>
