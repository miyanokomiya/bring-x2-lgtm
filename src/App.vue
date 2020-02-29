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
    <div
      class="mt-4 flex items-center justify-center canvas-list"
      :class="{ toggling: state.toggling }"
    >
      <div
        v-for="(c, i) in state.canvases.filter((_, i) => i < 3)"
        :key="i"
        class="mx-1 last:mr-0 w-1/3 border border-gray-300 cursor-pointer select-none"
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
        class="mx-1 last:mr-0 w-1/3 border border-gray-300 cursor-pointer select-none"
        @click="pickCanvas(i + 3)"
      >
        <SvgCanvas :canvas="c.state.canvas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from 'vue'
import { useMessages } from '@/hooks/messages'
import { useCanvas, Polygon, Canvas } from '@/hooks/canvas'
import { useEditor } from '@/hooks/editor'
import UploadForm from '@/components/organisms/UploadForm.vue'
import EditorForm from '@/components/organisms/EditorForm.vue'
import SvgCanvas from '@/components/molecules/SvgCanvas.vue'

export default {
  name: 'App',
  components: {
    UploadForm,
    EditorForm,
    SvgCanvas
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
      toggling: false
    })

    const loadImage = (base64: string) => {
      state.canvases.forEach(c => (c.state.canvas.src = base64))
    }

    const randomize = (canvas: Canvas): Canvas[] => {
      const rand = Math.random() * 50
      return state.canvases.map((c, i) => {
        return {
          ...canvas,
          polygons: canvas.polygons.map(p => ({
            ...p,
            y: p.y + (i < 3 ? rand * (i - 1) : 50 * Math.random() - 0.5)
          }))
        }
      })
    }

    const pickCanvas = (index: number, immediately = false) => {
      const exec = () => {
        const canvas = state.canvases[index]
        const canvases = randomize(canvas.state.canvas)
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
        }, 300)
      }
    }

    watchEffect(() => {
      state.canvases.forEach(c => {
        c.state.canvas.width = editor.state.width
        c.state.canvas.height = editor.state.height
        c.state.canvas.polygons.forEach((p: Polygon) => {
          p.text = editor.state.text
          p.fontSize = editor.state.fontSize
          p.fontWeight = editor.state.fontWeight
          p.stroke = editor.state.stroke
          p.fill = editor.state.fill
        })
      })
      // pickCanvas(1, true)
    })

    pickCanvas(1)

    return {
      state,
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

      &:nth-child(1),
      &:nth-child(4) {
        transform-origin: bottom right;
      }
      &:nth-child(2),
      &:nth-child(5) {
        transform-origin: bottom center;
      }
      &:nth-child(3),
      &:nth-child(6) {
        transform-origin: bottom left;
      }
    }
  }
}
</style>
