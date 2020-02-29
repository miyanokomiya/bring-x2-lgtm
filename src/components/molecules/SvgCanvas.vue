<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      font-family="sans-serif"
      :viewBox="`0 0 ${canvas.width} ${canvas.height}`"
    >
      <image
        x="0"
        y="0"
        :width="canvas.width"
        :height="canvas.height"
        :xlink:href="canvas.src"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      />
      <text
        v-for="(polygon, i) in canvas.polygons"
        :key="i"
        :x="polygon.x"
        :y="polygon.y"
        :font-size="polygon.fontSize"
        :font-weight="polygon.fontWeight"
        :stroke="polygon.stroke"
        :stroke-width="polygon.fontSize / 50"
        :fill="polygon.fill"
      >
        {{ polygon.text }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Canvas } from '@/hooks/canvas'

type Props = {
  canvas: Canvas
}

export default {
  props: {
    canvas: { type: Object as PropType<Canvas>, required: true }
  },
  setup(props: Props) {
    return { canvas: props.canvas }
  }
}
</script>
