import React, { useState } from 'react'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react' // 导入 Tabler 图标

interface DropdownProps {
  title: string // 下拉框标题，必填
  children: React.ReactNode // 子元素，支持 React 组件或 HTML 元素
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false) // 控制下拉框是否展开

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full">
      {/* 下拉框标题 */}
      <div
        className="flex items-center p-2 bg-gray-200 text-gray-700 cursor-pointer border-b border-gray-300"
        onClick={toggleDropdown}
      >
        {/* 图标和标题在左侧 */}
        <div className="flex items-center">
          {isOpen ? (
            <IconChevronRight className="text-gray-600 mr-2" size={20} />
          ) : (
            <IconChevronDown className="text-gray-600 mr-2" size={20} />
          )}
          <span className="select-none">{title}</span>
        </div>
      </div>

      {/* 下拉框内容 */}
      {isOpen && (
        <div className="relative bg-gray-100 border-t border-gray-300 w-full">
          {/* 如果没有子元素，则显示无元素提示 */}
          {React.Children.count(children) === 0 ? (
            <div className="p-3 text-center text-gray-500">No elements to show</div>
          ) : (
            <div className="p-3 text-gray-800">{children}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
