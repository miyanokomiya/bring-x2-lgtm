<template>
  <input
    :type="type"
    v-model="state.model"
    class="w-full px-2 py-1 border border-gray-500"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, watch, watchEffect } from 'vue'

export default defineComponent({
  props: {
    type: { type: String, default: 'text' },
    value: { type: [String, Number], required: true }
  },
  setup(props, ctx) {
    const state = reactive<{ model: string | number }>({
      model: ''
    })

    watchEffect(() => {
      state.model = props.value
    })

    watch(
      () => state.model,
      to => ctx.emit('update', to)
    )

    return {
      state
    }
  }
})
</script>
