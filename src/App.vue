<template>
  <div id="app" class="pt-4 pb-12">
    <div>
      <div
        class="flex items-center justify-center flex-wrap canvas-list"
        :class="{ toggling: state.toggling }"
      >
        <div
          v-for="(c, i) in state.canvases"
          :key="i"
          class="last:mr-0 w-1/2 border-2 border-gray-300 cursor-pointer select-none sm:w-1/3"
          :class="{ 'border-green-500': i === state.baseIndex }"
          @click="pickCanvas(i)"
        >
          <SvgCanvas :canvas="c.state.canvas" />
        </div>
      </div>
    </div>
    <div class="mt-4 px-4 flex items-center flex-wrap">
      <KeyTag
        class="mr-2 mb-2"
        label="Size"
        :selected="state.randomizeKyes.includes('fontSize')"
        @select="toggleRandomizeKey('fontSize')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Weight"
        :selected="state.randomizeKyes.includes('fontWeight')"
        @select="toggleRandomizeKey('fontWeight')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Fill"
        :selected="state.randomizeKyes.includes('fill')"
        @select="toggleRandomizeKey('fill')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Stroke"
        :selected="state.randomizeKyes.includes('stroke')"
        @select="toggleRandomizeKey('stroke')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="X"
        :selected="state.randomizeKyes.includes('x')"
        @select="toggleRandomizeKey('x')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Y"
        :selected="state.randomizeKyes.includes('y')"
        @select="toggleRandomizeKey('y')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Angle"
        :selected="state.randomizeKyes.includes('radian')"
        @select="toggleRandomizeKey('radian')"
      />
      <KeyTag
        class="mr-2 mb-2"
        label="Rotate"
        :selected="state.randomizeKyes.includes('textRadian')"
        @select="toggleRandomizeKey('textRadian')"
      />
    </div>
    <div class="mt-2 px-4 flex flex-col sm:flex-row">
      <EditorForm class="mb-4 sm:mb-0 sm:mr-8" />
      <div class="flec flex-col">
        <UploadForm @loadImage="loadImage" />
        <button
          class="mt-2 w-32 h-8 border bg-blue-100 hover:bg-blue-200"
          @click="download"
        >
          Download
        </button>
      </div>
      <div class="w-0 h-0" ref="hiddenCanvas">
        <SvgCanvas :canvas="state.baseCanvas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useCanvas, randomize, Polygon, Canvas } from '@/hooks/canvas'
import { useEditor } from '@/hooks/editor'
import { imageToBase64, saveFileInWeb } from '@/utils/file'
import sampleImage from '@/assets/cat.jpg'
import UploadForm from '@/components/organisms/UploadForm.vue'
import EditorForm from '@/components/organisms/EditorForm.vue'
import SvgCanvas from '@/components/molecules/SvgCanvas.vue'
import KeyTag from '@/components/atoms/KeyTag.vue'

export default {
  name: 'App',
  components: {
    UploadForm,
    EditorForm,
    SvgCanvas,
    KeyTag
  },
  setup() {
    const hiddenCanvas = ref('111')
    const editor = useEditor()
    const state = reactive({
      canvases: [
        useCanvas(editor.state),
        useCanvas(editor.state),
        useCanvas(editor.state),
        useCanvas(editor.state),
        useCanvas(editor.state),
        useCanvas(editor.state)
      ],
      baseIndex: computed((): number => 0),
      baseCanvas: computed(
        (): Canvas => state.canvases[state.baseIndex].state.canvas
      ),
      toggling: false,
      randomizeKyes: ['fontSize', 'fontWeight', 'fill', 'radian'] as string[]
    })

    const loadImage = (base64: string) => {
      state.canvases.forEach(c => (c.state.canvas.src = base64))
    }

    const img = new Image()
    img.onload = () => {
      loadImage(imageToBase64(img))
    }
    img.onerror = e => console.log(e)
    img.src = sampleImage

    const randomizeCanvases = (canvas: Canvas): Canvas[] => {
      const rand = Math.random()
      return state.canvases.map((_, i) => {
        return randomize(canvas, i, state.randomizeKyes, rand)
      })
    }

    const pickCanvas = (index: number) => {
      const canvas = state.canvases[index]
      if (!canvas) return

      state.toggling = true
      setTimeout(() => {
        const canvases = randomizeCanvases(canvas.state.canvas)
        state.canvases.forEach((c, i) => {
          c.state.canvas.polygons = canvases[i].polygons
        })
        state.toggling = false
        const polygon = state.baseCanvas.polygons[0]
        if (polygon) {
          editor.state.fontSize = polygon.fontSize
          editor.state.fill = polygon.fill
          editor.state.stroke = polygon.stroke
          editor.state.fontWeight = polygon.fontWeight
          editor.state.x = polygon.x
          editor.state.y = polygon.y
          editor.state.radian = polygon.radian
          editor.state.textRadian = polygon.textRadian
        }
      }, 300)
    }

    watch(
      () => [
        editor.state.width,
        editor.state.height,
        editor.state.text,
        editor.state.fontSize,
        editor.state.fontWeight,
        editor.state.stroke,
        editor.state.fill,
        editor.state.x,
        editor.state.y,
        editor.state.radian,
        editor.state.textRadian
      ],
      () => {
        state.baseCanvas.width = editor.state.width
        state.baseCanvas.height = editor.state.height
        state.baseCanvas.polygons.forEach((p: Polygon) => {
          p.text = editor.state.text
          p.fontSize = editor.state.fontSize
          p.fontWeight = editor.state.fontWeight
          p.stroke = editor.state.stroke
          p.x = editor.state.x
          p.y = editor.state.y
          p.radian = editor.state.radian
          p.textRadian = editor.state.textRadian
        })
      }
    )

    const toggleRandomizeKey = (key: string) => {
      const index = state.randomizeKyes.indexOf(key)
      if (index === -1) {
        state.randomizeKyes.push(key)
      } else {
        state.randomizeKyes.splice(index, 1)
      }

      pickCanvas(state.baseIndex)
    }

    const download = () => {
      if (!hiddenCanvas.value) return
      // eslint-disable-next-line
      const svg = (hiddenCanvas.value as any).getElementsByTagName('svg')[0]
      const data = 'data:image/svg+xml;base64,' + window.btoa(svg.outerHTML)
      saveFileInWeb(data, 'svg')
    }

    pickCanvas(state.baseIndex)

    return {
      state,
      toggleRandomizeKey,
      loadImage,
      pickCanvas,
      download,
      hiddenCanvas
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.canvas-list {
  > div {
    transition: all 0.3s;
  }
  &.toggling {
    > div {
      transform: scale(0, 0);

      &:nth-child(2n + 1) {
        transform-origin: bottom right;
      }
      &:nth-child(2n) {
        transform-origin: bottom left;
      }
    }
  }
}

@media (min-width: 640px) {
  .canvas-list {
    &.toggling {
      > div {
        &:nth-child(3n + 1) {
          transform-origin: bottom right;
        }
        &:nth-child(3n + 2) {
          transform-origin: bottom center;
        }
        &:nth-child(3n) {
          transform-origin: bottom left;
        }
      }
    }
  }
}
</style>
