<template>
  <div>
    <button
      @dragover.prevent="e => (e.dataTransfer.dropEffect = 'copy')"
      @dragleave.prevent
      @drop.prevent="inputFile"
      @click="clickInput"
      class="w-32 h-32 border bg-gray-100 hover:bg-gray-200"
    >
      Click or Drop Image
    </button>
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept="image/*"
      @change="inputFile"
    />
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue'
import { readImageFile } from '@/utils/file'
import { useMessages } from '@/hooks/messages'

type Props = {}

export default {
  name: 'HelloWorld',
  props: {},
  setup(_: Props, ctx: SetupContext) {
    const { pushError } = useMessages()

    const inputRef = ref<HTMLInputElement | null>(null)
    const clickInput = () => inputRef.value && inputRef.value.click()

    const inputFile = (
      e: {
        target: HTMLInputElement
      } & { dataTransfer: { files: File[] } }
    ) => {
      const files = e.target.files ? e.target.files : e.dataTransfer.files
      if (!files || files.length === 0) return

      const file = files[0]
      readImageFile(file)
        .then(({ base64, width, height }) => {
          ctx.emit('loadImage', base64, width, height)
        })
        .catch(e => {
          pushError(`Failed to read file: ${e.message}`)
        })
    }

    return {
      inputRef,
      clickInput,
      inputFile
    }
  }
}
</script>

<style scoped lang="scss"></style>
