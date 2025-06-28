import { useRef, useEffect, useState } from 'react'
import type { FC } from 'react'

export type TimeStampMeta = {
  start: number;  // 开始时间
  end: number;    // 结束时间
  interval: number; // 时间间隔
}

export type InteractiveHeatmapProps = {
  data: number[][] // n x N 热图数据
  cellWidth?: number
  cellHeight?: number
  historyData?: number[] // 1D 历史数据
  TimeStampMeta: TimeStampMeta // 时间戳元数据
  dataOffset?: number // 热图数据的起始时间戳偏移
  historyOffset?: number // 历史数据的起始时间戳偏移
}

const InteractiveHeatmap: FC<InteractiveHeatmapProps> = ({
  data,
  cellWidth = 4,
  cellHeight = 4,
  historyData = [],
  TimeStampMeta: { start, end, interval },
  dataOffset = 0, // 默认为 0，表示热图数据从 `start` 开始
  historyOffset = 0 // 默认为 0，表示历史数据从 `start` 开始
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)

  const n = data.length
  const N = data[0].length
  const max = Math.max(...data.flat())
  const width = n * cellWidth
  const height = N * cellHeight

  // 自动生成历史数据的时间戳，考虑历史数据的 start 偏移量
  const historyTimeStamps = Array.from(
    { length: historyData.length },
    (_, i) => start + historyOffset + i * interval
  )

  // 热图数据的时间戳，考虑数据的 start 偏移量
  const dataTimeStamps = Array.from({ length: n }, (_, i) => start + dataOffset + i * interval)

  // 时间范围内的比例尺
  const timeScale = width / (end - start)

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

    // 绘制历史数据折线图，横轴为时间戳
    if (historyData.length > 0) {
      ctx.strokeStyle = '#FF6347' // 红色的折线
      ctx.lineWidth = 2

      for (let i = 0; i < historyData.length - 1; i++) {
        // 将时间戳映射到横轴
        const time1 = historyTimeStamps[i]
        const time2 = historyTimeStamps[i + 1]
        const x1 = (time1 - start) * timeScale
        const x2 = (time2 - start) * timeScale

        // 根据历史数据的值，映射到画布高度
        const y1 = height - (historyData[i] / Math.max(...historyData)) * height
        const y2 = height - (historyData[i + 1] / Math.max(...historyData)) * height

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }

    // 绘制横轴 (X轴)
    ctx.strokeStyle = '#000'
    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(width, height)
    ctx.stroke()

    // 绘制纵轴 (Y轴)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, height)
    ctx.stroke()

    // 绘制 X 轴时间标签
    for (let t = 0; t < n; t += Math.floor(n / 5)) {
      const x = t * timeScale
      const label = new Date(dataTimeStamps[t] * 1000).toLocaleTimeString()
      ctx.fillText(label, x, height + 15)
    }

    // 绘制 Y 轴标签（概率）
    for (let i = 0; i < N; i += Math.floor(N / 5)) {
      const y = height - i * (height / N)
      ctx.fillText(`${((i / N) * 100).toFixed(2)}%`, -35, y)
    }
  }, [
    data,
    cellWidth,
    cellHeight,
    n,
    N,
    max,
    width,
    height,
    historyData,
    start,
    end,
    timeScale,
    historyTimeStamps
  ])

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
      {/* Tooltip */}
      {hover && hover.x >= 0 && hover.x < n && hover.y >= 0 && hover.y < N && (
        <div
          className="absolute bg-white text-sm text-gray-700 shadow px-2 py-1 rounded border"
          style={{
            left: hover.x * cellWidth + 10,
            top: hover.y * cellHeight + 10
          }}
        >
          <div>
            <b>Step:</b> {hover.x}
          </div>
          <div>
            <b>X-bin:</b> {N - 1 - hover.y}
          </div>
          <div>
            <b>Prob:</b> {data[hover.x]?.[N - 1 - hover.y]?.toFixed(4)}
          </div>
        </div>
      )}
      {/* 底部坐标 */}
      {hover && (
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-sm text-gray-700">
          <div>
            <b>X:</b> {hover.x}
          </div>
          <div>
            <b>Y:</b> {hover.y}
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveHeatmap
