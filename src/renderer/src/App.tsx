import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import TrainingPage from './pages/TrainingPage' // ✅ 引入训练热图页面

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      {/* 顶部栏全屏宽度 */}
      <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* 下半部分：侧边栏 + 主内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
        />

        {/* 主内容区域 */}
        <main className="flex-1 bg-white p-6 overflow-auto">
          {renderTabContent(activeTab)}
        </main>
      </div>
    </div>
  )
}

function getTabLabel(id: string) {
  const labels: Record<string, string> = {
    dashboard: '仪表盘',
    strategy: '策略研究',
    monitor: '实时监控',
    logs: '回测日志',
    favorites: '我的收藏',
    security: '权限控制',
    settings: '设置',
    training: '训练热图', // ✅ 新增
  }
  return labels[id] ?? '未知模块'
}

function renderTabContent(tab: string) {
  if (tab === 'training') {
    return <TrainingPage />
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        当前页面：{getTabLabel(tab)}
      </h1>
      <p className="text-gray-600">
        这是“{getTabLabel(tab)}”页面的内容区。
      </p>
    </>
  )
}

export default App
