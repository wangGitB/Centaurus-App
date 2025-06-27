function App(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 顶部导航 */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">我的网站</div>
        <nav className="space-x-4 hidden md:block">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            首页
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            关于
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500">
            联系
          </a>
        </nav>
      </header>

      {/* 主体布局：侧边栏 + 主内容 */}
      <div className="flex flex-1">
        {/* 侧边栏 */}
        <aside className="w-64 bg-white border-r hidden md:block">
          <ul className="p-4 space-y-2">
            <li className="font-semibold text-gray-600">菜单</li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-blue-100">
                仪表盘
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-blue-100">
                用户管理
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 rounded hover:bg-blue-100">
                设置
              </a>
            </li>
          </ul>
        </aside>

        {/* 主内容 */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">欢迎来到首页</h1>
          <p className="text-gray-600 mb-6">这是一个使用 Tailwind CSS 构建的简单响应式布局示例。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">模块 1</div>
            <div className="p-4 bg-white rounded shadow">模块 2</div>
            <div className="p-4 bg-white rounded shadow">模块 3</div>
          </div>
        </main>
      </div>

      {/* 底部 */}
      <footer className="bg-white text-center py-4 text-sm text-gray-500 border-t">
        © 2025 我的公司. 保留所有权利.
      </footer>
    </div>
  )
}

export default App
