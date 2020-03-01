import { reactive } from 'vue'
import { Editor, FontWeight } from '@/hooks/editor'
import sampleImage from '@/assets/cat.jpg'

const randomColor = require('randomcolor')

export interface Polygon {
  x: number
  y: number
  radian: number
  textRadian: number
  text: string
  fontSize: number
  fontWeight: FontWeight
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
  if (index === 0) return 0
  if (index === 1) return -seed
  if (index === 0) return seed
  return 4 * (Math.random() - 0.5)
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
  if (keys.includes('fontWeight')) {
    const values: FontWeight[] = ['lighter', 'normal', 'bold', 'bolder']
    next.polygons = next.polygons.map(p => ({
      ...p,
      fontWeight:
        index === 0
          ? p.fontWeight
          : values[Math.floor(values.length * Math.random())]
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
  if (keys.includes('radian')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      radian: p.radian + 0.5 * randomizeValue(index, seed)
    }))
  }
  if (keys.includes('textRadian')) {
    next.polygons = next.polygons.map(p => ({
      ...p,
      textRadian: p.textRadian + 0.5 * randomizeValue(index, seed)
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
      src: canvas.src || sampleImage,
      polygons: canvas.polygons
        ? canvas.polygons.map(clonePolygon)
        : [
            {
              x: editor.x,
              y: editor.y,
              radian: editor.radian,
              textRadian: editor.textRadian,
              text: editor.text,
              fontSize: editor.fontSize,
              fontWeight: editor.fontWeight,
              stroke: editor.stroke,
              fill: editor.fill
            }
          ]
    }
  })

  return { state }
}
