import { reactive } from 'vue'
import { Editor } from '@/hooks/editor'

export interface Polygon {
  x: number
  y: number
  text: string
  fontSize: number
  fontWeight: number
  stroke: string
  fill: string
}

export interface Canvas {
  id: number
  width: number
  height: number
  src: string
  polygons: Polygon[]
}

export function clonePolygon(polygon: Polygon): Polygon {
  return { ...polygon }
}

export function useCanvas(editor: Editor, canvas: Partial<Canvas> = {}) {
  const state = reactive<{
    canvas: Canvas
  }>({
    canvas: {
      id: Math.random(),
      width: editor.width,
      height: editor.height,
      src: canvas.src || '',
      polygons: canvas.polygons
        ? canvas.polygons.map(clonePolygon)
        : [
            {
              x: 100,
              y: 100,
              text: 'LGTM',
              fontSize: 80,
              fontWeight: 500,
              stroke: 'white',
              fill: 'black'
            }
          ]
    }
  })

  return { state }
}
