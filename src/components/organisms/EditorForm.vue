<template>
  <form @submit.prevent>
    <div class="flex itemx-center">
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Width: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.width"
            @update="editor.update({ width: $event })"
          />
        </div>
      </label>
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Height: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.height"
            @update="editor.update({ height: $event })"
          />
        </div>
      </label>
    </div>
    <label class="mt-2 flex items-center">
      <span class="mr-2 w-24 text-right">Text: </span>
      <div class="w-56">
        <DefaultInput
          type="text"
          :value="editor.state.text"
          @update="editor.update({ text: $event })"
        />
      </div>
    </label>
    <div class="mt-2 flex itemx-center">
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Size: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.fontSize"
            @update="editor.update({ fontSize: $event })"
          />
        </div>
      </label>
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Weight: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.fontWeight"
            @update="editor.update({ fontWeight: $event })"
          />
        </div>
      </label>
    </div>
    <div class="mt-2 flex itemx-center">
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Stroke: </span>
        <div class="w-56">
          <DefaultInput
            type="text"
            :value="editor.state.stroke"
            @update="editor.update({ stroke: $event })"
          />
        </div>
      </label>
      <label class="flex items-center">
        <span class="mr-2 w-24 text-right">Fill: </span>
        <div class="w-56">
          <DefaultInput
            type="text"
            :value="editor.state.fill"
            @update="editor.update({ fill: $event })"
          />
        </div>
      </label>
    </div>
  </form>
</template>

<script lang="ts">
import { SetupContext } from 'vue'
import { useEditor } from '@/hooks/editor'
import DefaultInput from '@/components/atoms/DefaultInput.vue'

type Props = {}

export default {
  components: { DefaultInput },
  props: {},
  setup(_: Props, ctx: SetupContext) {
    // const { pushError } = useMessages()
    const editor = useEditor()

    return {
      editor
    }
  }
}
</script>

<style scoped lang="scss"></style>
