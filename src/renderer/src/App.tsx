import { useState } from 'react'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import TrainingPage from './pages/TrainingPage'
import DashboardPage from './pages/DashboardPage'
import KlinePage from './pages/kine/index'

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      {/* 顶部栏全屏宽度 */}
      <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* 下半部分：侧边栏 + 主内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 */}
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} />

        {/* 主内容区域 */}
        <main className="flex-1 bg-white p-6 overflow-auto">{renderTabContent(activeTab)}</main>
      </div>
    </div>
  )
}

function renderTabContent(tab: string): React.JSX.Element {
  if (tab === 'dashboard') {
    return <DashboardPage />
  }

  if (tab === 'training') {
    return <TrainingPage />
  }
  if (tab === 'kline') {
    return <KlinePage />
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dummy</h1>
      <p className="font-serif text-2xl">这是使用 Serif 字体的段落。</p>
    </>
  )
}

export default App
