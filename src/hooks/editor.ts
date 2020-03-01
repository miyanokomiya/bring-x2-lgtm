import { reactive, computed, ComputedRef } from 'vue'

export type FontWeight = 'lighter' | 'normal' | 'bold' | 'bolder'

export interface RestoredEditor {
  width: number
  height: number
  text: string
  fontSize: number
  fontWeight: FontWeight
  stroke: string
  fill: string
  x: number
  y: number
  radian: number
  textRadian: number
}

export interface Editor extends RestoredEditor {
  angle: ComputedRef<number>
  textAngle: ComputedRef<number>
}

const STRAGE_KEY = 'editor-state-v1'

const str = localStorage.getItem(STRAGE_KEY)
const restored: RestoredEditor = str
  ? JSON.parse(str)
  : {
      text: 'LGTM',
      width: 400,
      height: 400,
      fontSize: 80,
      fontWeight: 'normal',
      stroke: 'white',
      fill: 'black',
      x: 200,
      y: 300,
      radian: 0,
      textRadian: 0
    }

const state = reactive<Editor>({
  ...restored,
  angle: computed((): number => (state.radian * 180) / Math.PI),
  textAngle: computed((): number => (state.textRadian * 180) / Math.PI)
})

const update = (to: Partial<typeof state>) => {
  state.width = to.width || state.width
  state.height = to.height || state.height
  state.text = to.text || state.text
  state.fontSize = to.fontSize || state.fontSize
  state.fontWeight = to.fontWeight || state.fontWeight
  state.stroke = to.stroke || state.stroke
  state.fill = to.fill || state.fill
  state.x = to.x !== undefined ? to.x : state.x
  state.y = to.y !== undefined ? to.y : state.y
  state.radian = to.radian !== undefined ? to.radian : state.radian
  state.radian =
    to.angle !== undefined ? (to.angle * Math.PI) / 180 : state.radian
  state.textRadian =
    to.textRadian !== undefined ? to.textRadian : state.textRadian
  state.textRadian =
    to.textAngle !== undefined ? (to.textAngle * Math.PI) / 180 : state.radian

  const saved = { ...state }
  delete saved.angle
  delete saved.textAngle
  localStorage.setItem(STRAGE_KEY, JSON.stringify(saved))
}

export function useEditor() {
  return { state, update }
}
