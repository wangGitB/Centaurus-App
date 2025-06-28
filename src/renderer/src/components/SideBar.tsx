import { IconLayoutDashboard, IconChartDots, IconSettings } from '@tabler/icons-react'
import type { FC } from 'react'

type SidebarProps = {
  activeTab: string
  setActiveTab: (id: string) => void
  isOpen: boolean
}

const menu = [
  { id: 'dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { id: 'training', label: 'Training', icon: IconChartDots },
  { id: 'kline', label: 'Kline', icon: IconChartDots },
]

const SideBar: FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
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
              {/* 使用 primary 颜色指示器 */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-0.5 transition-colors ${
                  isActive ? 'bg-primary' : 'bg-transparent'
                }`}
              />

              {/* 图标区域 */}
              <div className="w-14 min-w-[3.5rem] max-w-[3.5rem] h-full flex items-center justify-center">
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 transform ${
                    isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'
                  } translate-y-[1px]`}
                />
              </div>

              {/* 文本区域 */}
              <div
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isOpen ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'
                }`}
              >
                <span className="text-sm">{label}</span>
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-full w-0.5 transition-colors ${
              activeTab === 'settings' ? 'bg-primary' : 'bg-transparent'
            }`}
          />

          <div className="w-14 min-w-[3.5rem] max-w-[3.5rem] h-full flex items-center justify-center">
            <IconSettings
              className={`h-5 w-5 transition-colors duration-200 transform ${
                activeTab === 'settings'
                  ? 'text-primary'
                  : 'text-gray-400 group-hover:text-gray-600'
              } translate-y-[1px]`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
              isOpen ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'
            }`}
          >
            <span className="text-sm">设置</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
