<template>
  <div style="position: relative; padding-bottom: 100%;">
    <div class="absolute inset-0 flex items-center justify-center overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        font-family="sans-serif"
        :viewBox="`0 0 ${canvas.width} ${canvas.height}`"
        :width="canvas.width"
        :height="canvas.height"
      >
        <image
          x="0"
          y="0"
          :width="canvas.width"
          :height="canvas.height"
          :xlink:href="canvas.src"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        />
        <SvgText
          v-for="(polygon, i) in canvas.polygons"
          :key="i"
          :x="polygon.x"
          :y="polygon.y"
          :radian="polygon.radian"
          :textRadian="polygon.textRadian"
          :font-size="polygon.fontSize"
          :font-weight="polygon.fontWeight"
          :stroke="polygon.stroke"
          :stroke-width="polygon.fontSize / 50"
          :fill="polygon.fill"
          :text="polygon.text"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Canvas } from '@/hooks/canvas'
import SvgText from '@/components/atoms/SvgText.vue'

type Props = {
  canvas: Canvas
}

export default {
  components: { SvgText },
  props: {
    canvas: { type: Object as PropType<Canvas>, required: true }
  },
  setup(props: Props) {
    return { canvas: props.canvas }
  }
}
</script>
