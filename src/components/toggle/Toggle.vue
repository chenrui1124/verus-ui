<script lang="ts">
import { computed } from 'vue'
import { BaseIcon } from '@/base'
import { useSwitch } from '@/composable'
import { cn, ui } from '@/utils'

export interface ToggleProps {
  modelValue?: boolean
  disabled?: boolean
  icon?: string | [IconWhenModelValueIsTrue: string, IconWhenModelValueIsFalse: string]
  rounded?: boolean
}
</script>

<script lang="ts" setup>
const { icon } = defineProps<Omit<ToggleProps, 'modelValue'>>()

const modelValue = defineModel<ToggleProps['modelValue']>()

const { state, toggle } = useSwitch({ modelValue })

const computedIcon = computed(() => (Array.isArray(icon) ? icon[state.value ? 0 : 1] : icon))
</script>

<template>
  <button
    @click="toggle"
    :disabled
    :class="
      cn(
        ui('outline_focus_visible'),
        'relative box-border h-9 cursor-pointer border-none bg-transparent p-1.5 transition duration-300 **:box-border disabled:cursor-not-allowed disabled:text-on-dis',
        rounded ? 'rounded-full' : 'rounded-v2',
        state ? 'bg-pri-ctr text-pri disabled:bg-dis' : 'text-otl enabled:hover:bg-sur-var'
      )
    "
  >
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      leave-active-class="absolute"
    >
      <BaseIcon
        v-if="computedIcon"
        :icon="computedIcon"
        :key="computedIcon"
        size="lg"
        class="transition duration-300"
      />
    </Transition>
  </button>
</template>
