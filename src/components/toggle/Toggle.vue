<script lang="ts">
import { computed, inject } from 'vue'
import { BaseIcon } from '@/base'
import { useSwitch } from '@/composable'
import { cn, ui } from '@/utils'
import { toggleGroupKey } from '../toggle-group/ToggleGroup.vue'

export interface ToggleProps {
  modelValue?: boolean
  disabled?: boolean
  icon?: string | [IconWhenModelValueIsTrue: string, IconWhenModelValueIsFalse: string]
  rounded?: boolean
  value?: string
}
</script>

<script lang="ts" setup>
const { disabled, icon, rounded, value } = defineProps<Omit<ToggleProps, 'modelValue'>>()

const modelValue = defineModel<ToggleProps['modelValue']>()

const fallbackProps = computed(() => ({ disabled, rounded }))

const { props, groupModel, setGroupModel } = inject(toggleGroupKey, { props: fallbackProps })

const { state, toggle } = useSwitch({
  modelValue,
  onSwitch: nv => nv && value && setGroupModel && setGroupModel(value)
})

const finalState = computed(() => {
  if (!groupModel || !value) return state.value
  return (modelValue.value = groupModel.value === value)
})

const renderedIcon = computed(() => (Array.isArray(icon) ? icon[finalState.value ? 0 : 1] : icon))
</script>

<template>
  <button
    :disabled="props.disabled"
    role="switch"
    :aria-checked="finalState"
    @click="toggle"
    :class="
      cn(
        ui('outline_focus_visible'),
        'relative box-border size-9 cursor-pointer border-none bg-transparent p-1.5 transition duration-300 **:box-border disabled:cursor-not-allowed disabled:text-on-dis',
        props.rounded ? 'rounded-full' : 'rounded-v2',
        finalState ? 'bg-pri-ctr text-pri disabled:bg-dis' : 'text-otl enabled:hover:bg-sur-var'
      )
    "
  >
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      leave-active-class="absolute"
    >
      <BaseIcon
        v-if="renderedIcon"
        :icon="renderedIcon"
        :key="renderedIcon"
        size="lg"
        class="transition duration-300"
      />
    </Transition>
  </button>
</template>
