export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5">
        <div className="text-xl font-semibold mb-8">ComplyPilot</div>

        <nav className="space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded-lg bg-gray-100">
            Dashboard
          </a>

          <a href="/chat" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            AI Chat
          </a>

          <a href="/settings" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1">
        <div className="h-14 bg-white border-b flex items-center justify-between px-6">
          <span className="text-sm text-gray-600">Dashboard</span>
          <span className="text-sm text-gray-700">Account</span>
        </div>

        <div className="p-8">
          {children}
        </div>
      </div>

    </div>
  );
}
