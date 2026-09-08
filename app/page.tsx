export default function Home() {
  return (
    <main className="min-h-screen bg-[#090B1A] text-white">
      <div className="mx-auto max-w-md px-5 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50">Good morning 👋</p>
            <h1 className="mt-1 text-2xl font-bold">
              Welcome to LingoUp
            </h1>
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

          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-3/5 rounded-full bg-white" />
          </div>

          <p className="mt-3 text-sm text-white/70">
            Keep going! You are making progress.
          </p>
        </section>

        {/* Practice Cards */}
        <div className="space-y-4">

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-violet-300">PRONUNCIATION</p>
            <h2 className="mt-2 text-xl font-semibold">
              Improve your pronunciation
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Listen, speak, get AI feedback, and try again.
            </p>

            <button className="mt-5 rounded-2xl bg-white px-5 py-3 font-semibold text-[#090B1A]">
              Start Practice
            </button>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-blue-300">SPEAKMATE</p>
            <h2 className="mt-2 text-xl font-semibold">
              Talk with your AI partner
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Have a natural English conversation using your microphone.
            </p>

            <button className="mt-5 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 font-semibold">
              Start Speaking
            </button>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm text-pink-300">IELTS SPEAKING</p>
            <h2 className="mt-2 text-xl font-semibold">
              Practice with an AI Examiner
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Part 1, Part 2, and Part 3 with detailed feedback.
            </p>

            <button className="mt-5 rounded-2xl bg-white/10 px-5 py-3 font-semibold">
              Start IELTS
            </button>
          </section>

        </div>

        {/* Bottom Navigation */}
        <nav className="mt-10 flex items-center justify-around rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <button className="text-violet-300">Home</button>
          <button className="text-white/50">Practice</button>
          <button className="text-white/50">Progress</button>
          <button className="text-white/50">Profile</button>
        </nav>

      </div>
    </main>
  );
      }
