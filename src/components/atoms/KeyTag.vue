<template>
  <button
    class="px-4 border rounded"
    :class="{ 'text-white bg-green-500': selected }"
    @click="select"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { SetupContext } from 'vue'

type Props = {
  label: string
  selected: boolean
}

export default {
  props: {
    label: { type: String, required: true },
    selected: { type: Boolean, default: false }
  },
  setup(props: Props, ctx: SetupContext) {
    return {
      state: props,
      select: () => ctx.emit('select')
    }
  }
}
</script>
