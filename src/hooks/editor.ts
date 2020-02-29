import { reactive } from 'vue'

export interface Editor {
  width: number
  height: number
  text: string
  fontSize: number
  fontWeight: number
  stroke: string
  fill: string
}

const state = reactive<Editor>({
  text: 'LGTM',
  width: 400,
  height: 400,
  fontSize: 80,
  fontWeight: 500,
  stroke: 'white',
  fill: 'black'
})

const update = (to: Partial<typeof state>) => {
  state.width = to.width || state.width
  state.height = to.height || state.height
  state.text = to.text || state.text
  state.fontSize = to.fontSize || state.fontSize
  state.fontWeight = to.fontWeight || state.fontWeight
  state.stroke = to.stroke || state.stroke
  state.fill = to.fill || state.fill
}

export function useEditor() {
  return { state, update }
}
