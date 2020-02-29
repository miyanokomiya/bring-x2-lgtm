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
    <UploadForm @loadImage="loadImage" />
    <EditorForm class="mt-12" />
    <div class="mt-12 flex items-center justify-center">
      <!-- <img -->
      <!--   v-for="(c, i) in state.canvases" -->
      <!--   :key="i" -->
      <!--   :src="c.state.canvas.src" -->
      <!--   class="mx-1 last:mr-0 w-1/3 border border-gray-300" -->
      <!-- /> -->
      <div
        v-for="(c, i) in state.canvases"
        :key="i"
        class="mx-1 last:mr-0 w-1/3 border border-gray-300"
      >
        <SvgCanvas :canvas="c.state.canvas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watchEffect } from 'vue'
import { useMessages } from '@/hooks/messages'
import { useCanvas, Polygon } from '@/hooks/canvas'
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
    const canvases = [
      useCanvas(editor.state),
      useCanvas(editor.state),
      useCanvas(editor.state)
    ]

    watchEffect(() => {
      canvases.forEach(c => {
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
    })

    const loadImage = (base64: string) => {
      canvases.forEach(c => (c.state.canvas.src = base64))
    }

    return {
      state: { canvases },
      messages,
      loadImage
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
  margin-top: 60px;
}
</style>
