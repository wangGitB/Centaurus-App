import { IconMenu2 } from '@tabler/icons-react'

const TopBar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <div className="h-12 px-4 flex items-center bg-gray-100 border-b shadow-sm">
      <button
        onClick={onToggleSidebar}
        className="text-gray-700 hover:text-black focus:outline-none"
      >
        <IconMenu2 size={24} />
      </button>
      <span className="ml-4 font-medium text-gray-800">量化系统控制面板</span>
    </div>
  )
}

export default TopBar
