<template>
  <form @submit.prevent>
    <div class="flex itemx-center flex-wrap">
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Text: </span>
        <div class="w-56">
          <DefaultInput
            type="text"
            :value="editor.state.text"
            @update="editor.update({ text: $event })"
          />
        </div>
      </label>
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Angle: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="Math.round(editor.state.angle)"
            @update="editor.update({ angle: $event })"
          />
        </div>
      </label>
    </div>
    <div class="flex itemx-center flex-wrap">
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Rotate: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="Math.round(editor.state.textAngle)"
            @update="editor.update({ textAngle: $event })"
          />
        </div>
      </label>
    </div>
    <div class="flex itemx-center flex-wrap">
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Size: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.fontSize"
            @update="editor.update({ fontSize: $event })"
          />
        </div>
      </label>
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Weight: </span>
        <div class="w-56">
          <DefaultSelect
            :options="[
              { label: 'lighter', value: 'lighter' },
              { label: 'normal', value: 'normal' },
              { label: 'bold', value: 'bold' },
              { label: 'bolder', value: 'bolder' }
            ]"
            :value="editor.state.fontWeight"
            @update="editor.update({ fontWeight: $event })"
          />
        </div>
      </label>
    </div>
    <div class="flex itemx-center flex-wrap">
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Stroke: </span>
        <div class="w-56">
          <DefaultInput
            type="text"
            :value="editor.state.stroke"
            @update="editor.update({ stroke: $event })"
          />
        </div>
      </label>
      <label class="mb-2 flex items-center">
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
    <div class="flex itemx-center flex-wrap">
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">X: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.x"
            @update="editor.update({ x: $event })"
          />
        </div>
      </label>
      <label class="mb-2 flex items-center">
        <span class="mr-2 w-24 text-right">Y: </span>
        <div class="w-56">
          <DefaultInput
            type="number"
            :value="editor.state.y"
            @update="editor.update({ y: $event })"
          />
        </div>
      </label>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditor } from '@/hooks/editor'
import DefaultInput from '@/components/atoms/DefaultInput.vue'
import DefaultSelect from '@/components/atoms/DefaultSelect.vue'

export default defineComponent({
  components: { DefaultInput, DefaultSelect },
  props: {},
  setup() {
    const editor = useEditor()

    return { editor }
  }
})
</script>

<style scoped lang="scss"></style>
