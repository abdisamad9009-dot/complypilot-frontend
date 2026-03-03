export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-black/10 p-6">
        <div className="text-xl font-semibold mb-10 tracking-tight">
          ComplyPilot
        </div>

        <nav className="space-y-2 text-sm font-medium">
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-lg bg-black text-white"
          >
            Dashboard
          </a>

          <a
            href="/chat"
            className="block px-4 py-2 rounded-lg border border-black/10 hover:bg-black hover:text-white transition"
          >
            AI Chat
          </a>

          <a
            href="/settings"
            className="block px-4 py-2 rounded-lg border border-black/10 hover:bg-black hover:text-white transition"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1">

        {/* Top Bar */}
        <div className="h-16 border-b border-black/10 flex items-center justify-between px-8">
          <span className="text-sm font-medium">
            Dashboard
          </span>
          <span className="text-sm text-black/60">
            Account
          </span>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
