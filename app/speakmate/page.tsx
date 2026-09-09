"use client";

import { useState } from "react";

export default function SpeakMate() {
  const [listening, setListening] = useState(false);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-blue-700/20 blur-[130px]" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="absolute bottom-[-100px] right-[-80px] h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden bg-[#06102c]">

        {/* Top */}
        <header className="flex items-center justify-between px-5 pt-5">
          <button className="text-2xl text-white/90">
            ‹
          </button>

          <div className="text-center">
            <h1 className="text-[17px] font-bold">SpeakMate</h1>
            <p className="mt-1 text-[10px] text-white/50">
              Real conversations. Real progress.
            </p>
          </div>

          <button className="text-xl text-white/70">
            ⋮
          </button>
        </header>

        {/* Conversation area */}
        <section className="relative mx-4 mt-7 min-h-[690px] overflow-hidden rounded-[34px] border border-blue-400/20 bg-[#071438]">

          {/* Wave background */}
          <div className="absolute inset-0 opacity-80">
            <div className="absolute left-[-25%] top-[40%] h-32 w-[150%] rotate-[18deg] rounded-[50%] border-[25px] border-violet-500/20 blur-[12px]" />
            <div className="absolute left-[-20%] top-[45%] h-24 w-[150%] rotate-[18deg] rounded-[50%] border-[18px] border-blue-400/20 blur-[10px]" />
            <div className="absolute left-[-30%] top-[52%] h-28 w-[160%] rotate-[-10deg] rounded-[50%] border-[16px] border-fuchsia-500/20 blur-[12px]" />
          </div>

          <div className="relative z-10 px-5 pt-6">

            {/* AI message */}
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-300/40 bg-gradient-to-br from-indigo-500 to-blue-400 shadow-[0_0_25px_rgba(99,102,241,.35)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071438] text-sm">
                  ✦
                </div>
              </div>

              <div className="rounded-[20px] rounded-tl-md bg-white px-5 py-4 text-[#14204a] shadow-xl">
                <p className="text-[14px] font-semibold">
                  Hi Ruxsora! 👋
                </p>

                <p className="mt-2 text-[14px] leading-5">
                  What do you usually do
                  <br />
                  in your free time?
                </p>
              </div>
            </div>

            {/* Voice message */}
            <div className="ml-14 mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 px-4 py-3 shadow-lg shadow-blue-900/30">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                ▶
              </button>

              <div className="flex flex-1 items-center gap-[3px]">
                {[10, 18, 12, 25, 15, 29, 12, 21, 30, 15, 23, 10, 18, 26, 13, 22, 16, 28, 11, 20].map(
                  (height, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full bg-white/80"
                      style={{ height }}
                    />
                  )
                )}
              </div>

              <span className="text-[11px] font-medium">0:12</span>
            </div>

            {/* Microphone */}
            <div className="mt-24 flex flex-col items-center">

              <button
                onClick={() => setListening(!listening)}
                className={`relative flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300 ${
                  listening
                    ? "scale-110 shadow-[0_0_80px_rgba(79,70,229,.7)]"
                    : "shadow-[0_0_55px_rgba(59,130,246,.45)]"
                }`}
              >
                <div className="absolute inset-0 rounded-full border border-blue-300/50" />
                <div className="absolute inset-3 rounded-full border border-violet-400/50" />

                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 shadow-inner" />

                <span className="relative z-10 text-4xl">
                  🎙
                </span>
              </button>

              <p className="mt-6 text-[15px] font-semibold">
                {listening ? "I'm listening..." : "Tap to speak"}
              </p>

              {/* Audio waveform */}
              <div className="mt-5 flex h-10 items-center gap-[3px]">
                {[8, 18, 28, 15, 24, 12, 30, 18, 34, 14, 25, 10, 29, 16, 23, 11, 31, 18, 27, 12, 21, 9, 26, 15, 22].map(
                  (height, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full bg-gradient-to-t from-blue-400 to-violet-400"
                      style={{ height }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Tip */}
            <div className="absolute bottom-24 left-5 right-5 rounded-2xl border border-blue-300/10 bg-blue-950/70 p-4 backdrop-blur-xl">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                  💡
                </div>

                <div>
                  <p className="text-[13px] font-semibold">
                    Practice tips
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-white/55">
                    Try to speak naturally.
                    <br />
                    There’s no right or wrong answer.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center rounded-2xl border border-white/10 bg-[#07183c]/90 p-2 backdrop-blur-xl">

              <button className="flex flex-1 items-center justify-center gap-2 py-3 text-[12px] text-white/70">
                <span className="text-lg">↻</span>
                Repeat
              </button>

              <div className="h-7 w-px bg-white/10" />

              <button className="flex flex-1 items-center justify-center gap-2 py-3 text-[12px] text-white/70">
                <span className="text-lg">▷</span>
                Skip
              </button>

              <div className="h-7 w-px bg-white/10" />

              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 py-3 text-[12px] font-semibold shadow-lg">
                Next
                <span className="text-lg">→</span>
              </button>

            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <nav className="mt-5 grid grid-cols-5 px-3 pb-5">

          {[
            ["⌂", "Home"],
            ["◌", "Practice"],
            ["◉", "IELTS"],
            ["▥", "Progress"],
            ["♙", "Profile"],
          ].map(([icon, label]) => (
            <button
              key={label}
              className={`flex flex-col items-center gap-1 py-2 ${
                label === "Practice"
                  ? "text-violet-300"
                  : "text-white/35"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-[9px]">{label}</span>
            </button>
          ))}

        </nav>
      </div>
    </main>
  );
                }
