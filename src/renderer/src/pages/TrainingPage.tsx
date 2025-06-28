import { FC } from 'react'
import InteractiveHeatmap from '../components/InteractiveHeatmap'

// 示例历史数据（10个数据点）
const realHistoryData: number[] = [
  0.37454012, 0.95071431, 0.73199394, 0.59865848, 0.15601864, 0.15599452, 0.05808361, 0.86617615,
  0.60111501, 0.70807258
]

// 使用时间戳：从 1609459200（2021-01-01 00:00:00）开始，每 10 秒生成一个时间戳
const TimeStampMeta = {
  start: 1609459200, // 开始时间戳
  end: 1609459740, // 结束时间戳
  interval: 10 // 每个数据点之间的时间间隔（秒）
}

// 热图数据（50 x 100）
const realHeatmapData: number[][] = Array.from({ length: 50 }, () =>
  Array.from({ length: 100 }, () => Math.random())
)

const TrainingPage: FC = () => {
  return (
    <>
      <InteractiveHeatmap
        data={realHeatmapData} // 使用热图数据
        historyData={realHistoryData} // 使用历史数据
        TimeStampMeta={TimeStampMeta} // 使用时间戳元数据
        dataOffset={0} // 设置热图数据的起始偏移量
        historyOffset={200} // 设置历史数据的起始偏移量
      />
    </>
  )
}

export default TrainingPage
