import { FC } from 'react'
import InteractiveHeatmap from '../components/InteractiveHeatmap'
import { generateMockDistributions } from '../utils/mockDistributions'

const TrainingPage: FC = () => {
  const data = generateMockDistributions(21, 100) // 21 步，100 概率颗粒

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">训练过程热图</h1>
      <p className="text-gray-500 mb-4">
        展示训练过程中每一步输出的概率分布演化（颜色越深代表概率越高）
      </p>
      <InteractiveHeatmap data={data} />
    </div>
  )
}

export default TrainingPage
