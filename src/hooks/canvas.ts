import { reactive } from 'vue'
import { Editor } from '@/hooks/editor'

const randomColor = require('randomcolor')

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

function randomizeValue(index: number, seed: number): number {
  return index < 3 ? seed * (index - 1) : 4 * (Math.random() - 0.5)
}

export function randomize(
  canvas: Canvas,
  index: number,
  keys: string[],
  seed: number
): Canvas {
  const next = {
    ...canvas,
    polygons: canvas.polygons.map(p => ({ ...p }))
  }

  if (keys.includes('fontSize')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      fontSize: Math.max(
        p.fontSize + Math.round(20 * randomizeValue(index, seed)),
        10
      )
    }))
  }
  if (keys.includes('fill')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      fill: randomizeValue(index, seed) === 0 ? p.fill : randomColor()
    }))
  }
  if (keys.includes('stroke')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      stroke: randomizeValue(index, seed) === 0 ? p.stroke : randomColor()
    }))
  }
  if (keys.includes('x')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      x: p.x + 50 * randomizeValue(index, seed)
    }))
  }
  if (keys.includes('y')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      y: p.y + 50 * randomizeValue(index, seed)
    }))
  }

  return next
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
              x: 80,
              y: 260,
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
