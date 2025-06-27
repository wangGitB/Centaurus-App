// src/components/InteractiveHeatmap/index.tsx
import { useRef, useEffect, useState } from 'react'
import type { FC } from 'react'

export type InteractiveHeatmapProps = {
  data: number[][] // n x N
  cellWidth?: number
  cellHeight?: number
}

const InteractiveHeatmap: FC<InteractiveHeatmapProps> = ({
  data,
  cellWidth = 4,
  cellHeight = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)

  const n = data.length
  const N = data[0].length
  const max = Math.max(...data.flat())
  const width = n * cellWidth
  const height = N * cellHeight

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    // 绘制热图
    for (let t = 0; t < n; t++) {
      for (let i = 0; i < N; i++) {
        const p = data[t][i]
        const alpha = p / max
        ctx.fillStyle = `rgba(37,99,235,${alpha})` // blue-600 with alpha
        ctx.fillRect(t * cellWidth, (N - 1 - i) * cellHeight, cellWidth, cellHeight)
      }
    }
  }, [data, cellWidth, cellHeight, n, N, max, width, height])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / cellWidth)
    const y = Math.floor((e.clientY - rect.top) / cellHeight)
    setHover({ x, y })
  }

  return (
    <div className="relative w-full h-full overflow-auto">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="block border"
        style={{ width, height }}
      />
      {/* 十字线 + tooltip */}
      {hover && hover.x >= 0 && hover.x < n && hover.y >= 0 && hover.y < N && (
        <>
          {/* 十字线 */}
          <div
            className="absolute top-0 left-0 bg-black bg-opacity-20"
            style={{ left: hover.x * cellWidth, width: 1, height }}
          />
          <div
            className="absolute top-0 left-0 bg-black bg-opacity-20"
            style={{ top: hover.y * cellHeight, height: 1, width }}
          />
          {/* tooltip */}
          <div
            className="absolute bg-white text-sm text-gray-700 shadow px-2 py-1 rounded border"
            style={{ left: hover.x * cellWidth + 10, top: hover.y * cellHeight + 10 }}
          >
            <div><b>Step:</b> {hover.x}</div>
            <div><b>X-bin:</b> {N - 1 - hover.y}</div>
            <div><b>Prob:</b> {data[hover.x]?.[N - 1 - hover.y]?.toFixed(4)}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default InteractiveHeatmap
