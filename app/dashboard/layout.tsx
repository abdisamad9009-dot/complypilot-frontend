export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-black flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-black/10 p-6">
        <div className="text-xl font-semibold tracking-tight mb-10">
          ComplyPilot
        </div>

        <nav className="space-y-2 text-sm font-medium">

          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-lg bg-slate-900 text-white"
          >
            Dashboard
          </a>

          <a
            href="/chat"
            className="block px-4 py-2 rounded-lg border border-black/10 hover:bg-slate-900 hover:text-white transition duration-200"
          >
            AI Chat
          </a>

          <a
            href="/settings"
            className="block px-4 py-2 rounded-lg border border-black/10 hover:bg-slate-900 hover:text-white transition duration-200"
          >
            Settings
          </a>

        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1">

        {/* Top Bar */}
        <div className="h-16 border-b border-black/10 flex items-center justify-between px-8 bg-white">
          <span className="text-sm font-medium tracking-tight">
            Dashboard
          </span>
          <span className="text-sm text-black/60">
            Account
          </span>
        </div>

        {/* Page Content */}
        <div className="p-10">
          {children}
        </div>

      </div>
    </div>
  );
}
