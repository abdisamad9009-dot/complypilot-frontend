export default function ChatPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">AI Compliance Chat</h1>

      <div className="bg-white border rounded-xl p-4 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto text-sm text-gray-600">
          <p className="mb-2">
            👋 Welcome to ComplyPilot AI. Ask me about compliance risks,
            policies, or regulations.
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Ask a compliance question..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
