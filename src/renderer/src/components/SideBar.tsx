import { IconLayoutDashboard, IconSparkles, IconSettings } from '@tabler/icons-react'
import type { FC } from 'react'

type SidebarProps = {
  activeTab: string
  setActiveTab: (id: string) => void
  isOpen: boolean
}

const menu = [
  { id: 'dashboard', label: '仪表盘', icon: IconLayoutDashboard },
  { id: 'training', label: '训练热图', icon: IconSparkles }
]

const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  return (
    <div
      className="h-full bg-white border-r flex flex-col justify-between transition-all duration-300"
      style={{ width: isOpen ? '13rem' : '3.5rem' }}
    >
      <div className="py-2 flex flex-col space-y-1">
        {menu.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <div
              key={id}
              onClick={() => setActiveTab(id)}
              className="group relative flex items-center h-12 cursor-pointer"
            >
              {/* 蓝色指示器 */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-0.5 transition-colors ${
                  isActive ? 'bg-blue-600' : 'bg-transparent'
                }`}
              />

              {/* 图标区域 */}
              <div className="w-14 min-w-[3.5rem] max-w-[3.5rem] h-full flex items-center justify-center">
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 transform ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  } translate-y-[1px]`}
                />
              </div>

              {/* 文本区域 */}
              <div
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isOpen ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'
                }`}
              >
                <span className="text-sm text-gray-800">{label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 设置按钮 */}
      <div className="py-2">
        <div
          onClick={() => setActiveTab('settings')}
          className="group relative flex items-center h-12 cursor-pointer"
        >
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full transition-colors ${
              activeTab === 'settings' ? 'bg-blue-600' : 'bg-transparent'
            }`}
          />

          <div className="w-14 min-w-[3.5rem] max-w-[3.5rem] h-full flex items-center justify-center">
            <IconSettings
              className={`h-5 w-5 transition-colors duration-200 transform ${
                activeTab === 'settings'
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              } translate-y-[1px]`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'
            }`}
          >
            <span className="text-sm text-gray-800">设置</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
