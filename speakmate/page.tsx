"use client";

import { useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060B25] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-5 pt-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="text-center">
            <h1 className="text-[19px] font-semibold">SpeakMate</h1>
            <p className="mt-1 text-[10px] text-white/35">
              Real conversations. Real progress.
            </p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
            <span className="text-lg text-white/60">•••</span>
          </button>
        </div>

        {/* AI ORB */}
        <div className="relative mt-8 flex justify-center">
          <div className="absolute h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_45px_rgba(99,102,241,.45)]">
              <div className="relative h-10 w-12 rounded-[45%] bg-white">
                <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[#5965E8]" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#5965E8]" />

                <span className="absolute bottom-2 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[#5965E8]" />
              </div>
            </div>
          </div>
        </div>

        {/* AI QUESTION */}
        <div className="mt-7 rounded-[26px] border border-white/[0.08] bg-[#10183B] p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-violet-300">
            SpeakMate AI
          </p>

          <h2 className="mt-4 text-[19px] font-semibold">
            Hi Ruxsora! 👋
          </h2>

          <p className="mt-2 text-[15px] leading-6 text-white/55">
            What do you usually do in your free time?
          </p>
        </div>

        {/* AI VOICE */}
        <div className="mt-5 flex justify-end">
          <div className="flex items-center gap-3 rounded-[20px] bg-gradient-to-r from-[#7138E8] to-[#3977ED] px-4 py-3">

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </button>

            <div className="flex items-center gap-[3px]">
              {[10, 17, 24, 14, 28, 19, 25, 13, 20].map(
                (height, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-white/80"
                    style={{ height }}
                  />
                )
              )}
            </div>

            <span className="text-[11px] text-white/70">0:12</span>
          </div>
        </div>

        {/* USER ANSWER */}
        <div className="mt-5 rounded-[26px] border border-white/[0.08] bg-[#0D1636] p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
              Your speech
            </p>

            {isListening && (
              <span className="text-[10px] text-cyan-300">
                Listening
              </span>
            )}
          </div>

          <p className="mt-4 text-[14px] leading-6 text-white/40">
            {isListening
              ? "Listening to your answer..."
              : "Your words will appear here..."}
          </p>
        </div>

        {/* MICROPHONE */}
        <div className="flex flex-1 flex-col items-center justify-center py-8">

          <button
            onClick={() => setIsListening(!isListening)}
            className={`relative flex h-[118px] w-[118px] items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_70px_rgba(139,92,246,.5)]"
                : "bg-gradient-to-br from-[#7439E8] to-[#3977ED] shadow-[0_0_55px_rgba(99,82,235,.3)]"
            }`}
          >
            <span className="absolute inset-2 rounded-full border border-white/20" />

            <span className="absolute inset-4 rounded-full border border-white/10" />

            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <path d="M12 17v5" />
              <path d="M8 22h8" />
            </svg>
          </button>

          <p className="mt-5 text-[16px] font-semibold">
            {isListening ? "I'm listening..." : "Tap to speak"}
          </p>

          <p className="mt-1 text-[12px] text-white/35">
            {isListening
              ? "Tap the microphone when you finish"
              : "Speak naturally in English"}
          </p>

          {/* WAVEFORM */}
          <div className="mt-5 flex h-7 items-center gap-[4px]">
            {[9, 17, 25, 15, 22, 28, 19, 25, 12].map(
              (height, i) => (
                <span
                  key={i}
                  className={`w-[3px] rounded-full ${
                    isListening
                      ? "bg-violet-400"
                      : "bg-white/10"
                  }`}
                  style={{ height }}
                />
              )
            )}
          </div>
        </div>

        {/* TIPS */}
        <div className="rounded-[25px] border border-white/[0.08] bg-[#0D1636] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Practice tips
          </p>

          <div className="mt-4 space-y-3">
            <p className="text-[12px] text-white/45">
              • Speak naturally — don't worry about mistakes.
            </p>

            <p className="text-[12px] text-white/45">
              • Try to answer in complete sentences.
            </p>

            <p className="text-[12px] text-white/45">
              • Listen carefully and speak with confidence.
            </p>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <nav className="mt-5 flex items-center justify-between rounded-[25px] border border-white/[0.08] bg-[#10183B] px-2 py-4">

          <NavItem label="Home" icon="⌂" />

          <NavItem label="Practice" icon="✦" />

          <NavItem
            label="SpeakMate"
            icon="◉"
            active
          />

          <NavItem label="Progress" icon="◔" />

          <NavItem label="Profile" icon="○" />

        </nav>
      </div>
    </main>
  );
}

function NavItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-1/5 flex-col items-center gap-1 ${
        active ? "text-violet-300" : "text-white/30"
      }`}
    >
      <span className="text-[18px]">{icon}</span>
      <span className="text-[9px]">{label}</span>
    </button>
  );
      }
