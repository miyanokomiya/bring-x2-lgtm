<template>
  <g
    ref="root"
    :font-size="fontSize"
    :font-weight="fontWeight"
    :stroke="stroke"
    :stroke-width="fontSize / 50"
    :fill="fill"
    :transform="state.transform"
  >
    <text
      dominant-baseline="text-before-edge"
      :x="x"
      :y="y"
      :rotate="(textRadian * 180) / Math.PI"
    >
      {{ text }}
    </text>
  </g>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect } from 'vue'

export default defineComponent({
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    radian: { type: Number, required: true },
    textRadian: { type: Number, required: true },
    fontSize: { type: Number, required: true },
    fontWeight: { type: String, required: true },
    stroke: { type: String, required: true },
    strokeWidth: { type: Number, required: true },
    fill: { type: String, required: true },
    text: { type: String, required: true }
  },
  setup(props) {
    const root = ref<SVGGraphicsElement | null>(null)
    const state = reactive({
      width: 100,
      height: 100,
      transform: computed((): string =>
        [
          `translate(${-state.width / 2}, ${-state.height / 2})`,
          `rotate(${(props.radian * 180) / Math.PI}, ${props.x +
            state.width / 2}, ${props.y + state.height / 2})`
        ].join(' ')
      )
    })

    watchEffect(() => {
      if (!root.value) return

      const rect = root.value.getBBox()
      state.width = rect.width
      state.height = rect.height
    })

    return {
      root,
      state
    }
  }
})
</script>
