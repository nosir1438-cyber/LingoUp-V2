export default function Home() {
  return (
    <main className="min-h-screen bg-[#090B1A] text-white">
      <div className="mx-auto max-w-md px-5 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50">Good morning 👋</p>
            <h1 className="mt-1 text-2xl font-bold">Welcome to LingoUp</h1>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold">
            L
          </div>
        </div>

        {/* Progress Card */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-6 shadow-2xl">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-white/70">Your English level</p>
              <h2 className="mt-1 text-3xl font-bold">B1 → B2</h2>
            </div>

            <div className="text-right">
              <p className="text-xs text-white/60">Streak</p>
              <p className="text-xl font-bold">🔥 7 days</p>
            </div>
          </div>

          <div
