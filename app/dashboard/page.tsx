export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        ComplyPilot Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Compliance Score</p>
          <p className="text-4xl font-bold text-green-600">82%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Open Risks</p>
          <p className="text-4xl font-bold text-red-600">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Next Review</p>
          <p className="text-xl font-medium text-gray-800">12 March</p>
        </div>
      </div>
    </div>
  );
}  
