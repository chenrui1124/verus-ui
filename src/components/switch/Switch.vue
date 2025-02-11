<script lang="ts">
export interface SwitchProps {
  modelValue?: boolean
  danger?: boolean
  disabled?: boolean
}
</script>

<script lang="ts" setup>
defineProps<Omit<SwitchProps, 'modelValue'>>()

const modelValue = defineModel<SwitchProps['modelValue']>()
</script>

<template>
  <label
    :data-status="danger ? 'error' : void 0"
    :class="[
      'group/switch relative box-border inline-block h-7 w-12 cursor-pointer rounded-full bg-sur transition duration-300 has-focus-visible:ring-3 has-focus-visible:ring-pri/48 has-disabled:cursor-not-allowed has-disabled:bg-dis has-disabled:opacity-48',
      'before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-solid before:border-otl before:bg-otl/24 before:transition before:duration-300 has-checked:before:border-transparent has-checked:before:bg-pri has-disabled:before:border-dis',
      '*:top-1/2 *:left-3.5 has-checked:*:translate-x-5'
    ]"
  >
    <input
      type="checkbox"
      :disabled
      v-model="modelValue"
      class="peer pointer-events-none absolute -m-2.5 inline-block size-5 appearance-none rounded-full bg-otl transition duration-300 ease-braking outline-none not-checked:scale-75 group-active/switch:scale-125 checked:bg-sur"
    />
    <span
      class="pointer-events-none absolute -m-4.5 inline-block size-9 rounded-full transition duration-300 ease-braking group-hover/switch:bg-on-sur/12 group-hover/switch:peer-checked:bg-pri/12 peer-disabled:hidden"
    ></span>
  </label>
</template>
