<template>
  <input
    :type="type"
    v-model="state.model"
    class="w-full px-2 py-1 border border-gray-500"
  />
</template>

<script lang="ts">
import { reactive, watch, SetupContext } from 'vue'

type Props = {
  type: string
  value: string | number
}

export default {
  props: {
    type: { type: String, default: 'text' },
    value: { type: [String, Number], required: true }
  },
  setup(props: Props, ctx: SetupContext) {
    const state = reactive<{ model: string | number }>({
      model: props.value
    })

    watch(
      () => state.model,
      to => ctx.emit('update', to)
    )

    return {
      state
    }
  }
}
</script>
