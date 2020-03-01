type ImageData = { base64: string; width: number; height: number }

export function imageToBase64(img: HTMLImageElement): string {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Failed to create canvas.')
  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL()
}

export function readImageFile(file: File): Promise<ImageData> {
  return new Promise<ImageData>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const base64 = fileReader.result
      const img = new Image()
      img.onload = () => {
        resolve({
          base64: base64 as string,
          width: img.width,
          height: img.height
        })
      }
      img.onerror = reject
      img.src = base64 as string
    }
    fileReader.onerror = reject
    fileReader.readAsDataURL(file)
  })
}

export function saveFileInWeb(file: string, ex: string) {
  const a = document.createElement('a')
  a.href = file
  a.download = `${Date.now()}.${ex}`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function saveGifFile(gif: string) {
  saveFileInWeb(gif, 'gif')
}

export function saveJsonFile(json: object) {
  const text = JSON.stringify(json)
  saveFileInWeb(
    URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
    'json'
  )
}
