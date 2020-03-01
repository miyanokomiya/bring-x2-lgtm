<template>
  <select class="w-full px-2 py-1 border border-gray-500" @change="update">
    <option
      v-for="o in options"
      :key="o.value"
      :value="o.value"
      :selected="value === o.value"
    >
      {{ o.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<{ label: string; value: string }[]>,
      required: true
    },
    value: { type: String, required: true }
  },
  setup(props, ctx) {
    return {
      update: (e: { target: { value: string } }) =>
        ctx.emit('update', e.target.value)
    }
  }
})
</script>
