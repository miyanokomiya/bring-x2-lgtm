<template>
  <div id="app">
    <div>
      <p
        v-for="info in messages.state.infos"
        :key="info"
        @click="messages.removeInfo(info)"
      >
        {{ info }}
      </p>
      <p
        v-for="error in messages.state.errors"
        :key="error"
        @click="messages.removeError(error)"
      >
        {{ error }}
      </p>
    </div>
    <div class="mt-4 px-4 flex items-center">
      <EditorForm class="mr-8" />
      <UploadForm @loadImage="loadImage" />
    </div>
    <div class="mt-4 px-4 flex items-center">
      <KeyTag
        class="mr-2"
        label="Size"
        :selected="state.randomizeKyes.includes('fontSize')"
        @select="toggleRandomizeKey('fontSize')"
      />
      <KeyTag
        class="mr-2"
        label="Fill"
        :selected="state.randomizeKyes.includes('fill')"
        @select="toggleRandomizeKey('fill')"
      />
      <KeyTag
        class="mr-2"
        label="Stroke"
        :selected="state.randomizeKyes.includes('stroke')"
        @select="toggleRandomizeKey('stroke')"
      />
      <KeyTag
        class="mr-2"
        label="X"
        :selected="state.randomizeKyes.includes('x')"
        @select="toggleRandomizeKey('x')"
      />
      <KeyTag
        class="mr-2"
        label="Y"
        :selected="state.randomizeKyes.includes('y')"
        @select="toggleRandomizeKey('y')"
      />
    </div>
    <div
      class="mt-4 flex items-center justify-center canvas-list"
      :class="{ toggling: state.toggling }"
    >
      <div
        v-for="(c, i) in state.canvases.filter((_, i) => i < 3)"
        :key="i"
        class="mx-1 last:mr-0 w-1/3 border-2 border-gray-300 cursor-pointer select-none"
        :class="{ 'border-green-500': i === 1 }"
        @click="pickCanvas(i)"
      >
        <SvgCanvas :canvas="c.state.canvas" />
      </div>
    </div>
    <div
      class="mt-4 flex items-center justify-center canvas-list"
      :class="{ toggling: state.toggling }"
    >
      <div
        v-for="(c, i) in state.canvases.filter((_, i) => 3 <= i)"
        :key="i"
        class="mx-1 last:mr-0 w-1/3 border-2 border-gray-300 cursor-pointer select-none"
        @click="pickCanvas(i + 3)"
      >
        <SvgCanvas :canvas="c.state.canvas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watch } from 'vue'
import { useMessages } from '@/hooks/messages'
import { useCanvas, randomize, Polygon, Canvas } from '@/hooks/canvas'
import { useEditor } from '@/hooks/editor'
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
    const messages = useMessages()
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
      toggling: false,
      randomizeKyes: ['fontSize', 'fill'] as string[]
    })

    const loadImage = (base64: string) => {
      state.canvases.forEach(c => (c.state.canvas.src = base64))
    }

    const randomizeCanvases = (canvas: Canvas): Canvas[] => {
      const rand = Math.random()
      return state.canvases.map((_, i) => {
        return randomize(canvas, i, state.randomizeKyes, rand)
      })
    }

    const pickCanvas = (index: number, immediately = false) => {
      const canvas = state.canvases[index]
      if (!canvas) return

      const exec = () => {
        const canvases = randomizeCanvases(canvas.state.canvas)
        state.canvases.forEach((c, i) => {
          c.state.canvas.polygons = canvases[i].polygons
        })
      }

      if (immediately) {
        exec()
      } else {
        state.toggling = true
        setTimeout(() => {
          exec()
          state.toggling = false
          const polygon = canvas.state.canvas.polygons[0]
          if (polygon) {
            editor.state.fontSize = polygon.fontSize
            editor.state.fill = polygon.fill
            editor.state.stroke = polygon.stroke
            editor.state.fontWeight = polygon.fontWeight
          }
        }, 300)
      }
    }

    watch(
      () => [
        editor.state.width,
        editor.state.height,
        editor.state.text,
        editor.state.fontSize,
        editor.state.fontWeight,
        editor.state.stroke,
        editor.state.fill
      ],
      () => {
        state.canvases[1].state.canvas.width = editor.state.width
        state.canvases[1].state.canvas.height = editor.state.height
        state.canvases[1].state.canvas.polygons.forEach((p: Polygon) => {
          p.text = editor.state.text
          p.fontSize = editor.state.fontSize
          p.fontWeight = editor.state.fontWeight
          p.stroke = editor.state.stroke
          p.fill = editor.state.fill
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

      pickCanvas(1)
    }

    pickCanvas(1)

    return {
      state,
      toggleRandomizeKey,
      messages,
      loadImage,
      pickCanvas
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
      opacity: 0.5;
      transform: scale(0, 0);

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
</style>
