import { FC } from 'react'
import Dropdown from '../components/Dropdown'
import YellowBreathingCircle from '../components/BreathingCircle'

const DashboardPage: FC = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">训练过程热图</h1>
        <p className="text-gray-500 mb-4">
          展示训练过程中每一步输出的概率分布演化（颜色越深代表概率越高）
        </p>
      </div>
      <Dropdown title="untitiled">
        <h1>123</h1>
        <p>456</p>
        <p>789</p>
        <p>101112</p>
      </Dropdown>

      <button className="box-border border-[1.5px] border-gray-600 w-28 h-12 text-center hover:border-[2.5px]">
        Button
      </button>

      <YellowBreathingCircle />
    </>
  )
}

export default DashboardPage
