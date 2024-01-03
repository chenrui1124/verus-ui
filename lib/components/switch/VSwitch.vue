<script setup lang="ts">
import type { SwitchModel, SwitchProps } from '.'

defineOptions({ name: 'Switch', inheritAttrs: false })

defineProps<SwitchProps>()

const modelValue = defineModel<SwitchModel['modelValue']>({ required: true })

const emit = defineEmits<{ switch: [newValue: boolean] }>()

function onChange(e: Event) {
  const t = e.target as HTMLInputElement
  requestAnimationFrame(() => {
    modelValue.value = t.checked
    emit('switch', modelValue.value)
  })
}
</script>

<template>
  <label
    class="group/v-switch relative inline-block h-7 w-12 cursor-pointer rounded-full transition-colors duration-300 has-[:focus-visible]:v-outline has-[:disabled]:v-disabled"
    :class="[
      'before:v-shade before:border before:border-solid before:transition-colors before:duration-300',
      'after:pointer-events-none after:absolute after:inset-y-1 after:left-1 after:-m-2 after:size-9 after:rounded-inherit after:transition after:duration-300 after:ease-braking focus-within:after:!bg-on-bsc/12 hover:after:bg-on-bsc/8',
      {
        'bg-pri before:border-transparent after:translate-x-5 has-[:disabled]:bg-dis': modelValue,
        'bg-bsc before:border-otl has-[:disabled]:before:border-dis': !modelValue
      }
    ]"
  >
    <input
      :disabled
      type="checkbox"
      v-model="modelValue"
      @change="onChange"
      class="pointer-events-none absolute inset-y-1 left-1 m-0 size-5 appearance-none rounded-inherit outline-none transition duration-300 ease-braking group-active/v-switch:scale-125"
      :class="{
        'bg-on-pri disabled:bg-bsc': modelValue,
        'scale-75 bg-otl': !modelValue,
        'translate-x-5': modelValue
      }"
    />
  </label>
</template>