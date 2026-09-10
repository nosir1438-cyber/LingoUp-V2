"use client";

import { useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);

  const toggleMic = () => {
    setIsListening((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-[#050B24] text-white">
      <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-5 pt-5">

        {/* TOP HEADER */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white/80"
            aria-label="Back"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h1 className="text-[20px] font-bold tracking-tight">
              SpeakMate
            </h1>
            <p className="mt-1 text-[11px] text-white/35">
              Real conversations. Real progress.
            </p>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06]"
            aria-label="More"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="5" r="1" fill="currentColor" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </button>
        </header>

        {/* AI AVATAR */}
        <section className="mt-8 flex justify-center">
          <div className="relative flex h-[108px] w-[108px] items-center justify-center">

            <div className="absolute inset-0 rounded-full bg-violet-600/10 blur-2xl" />

            <div className="absolute inset-[7px] rounded-full border border-violet-400/20" />

            <div className="absolute inset-[17px] rounded-full border border-blue-400/20" />

            <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] shadow-[0_0_45px_rgba(99,102,241,0.35)]">

              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
              >
                <rect
                  x="7"
                  y="8"
                  width="28"
                  height="25"
                  rx="11"
                  fill="white"
                />

                <circle
                  cx="15"
                  cy="19"
                  r="3"
                  fill="#5965E8"
                />

                <circle
                  cx="27"
                  cy="19"
                  r="3"
                  fill="#5965E8"
                />

                <path
                  d="M15 26C17.7 28 24.3 28 27 26"
                  stroke="#5965E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* AI MESSAGE */}
        <section className="mt-7 rounded-[28px] border border-white/[0.09] bg-[#101A3D]/90 px-5 py-5 shadow-[0_15px_45px_rgba(0,0,0,0.15)]">

          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/90">
            SpeakMate AI
          </p>

          <h2 className="mt-4 text-[20px] font-semibold leading-7">
            Hi Ruxsora!
          </h2>

          <p className="mt-2 text-[16px] leading-7 text-white/55">
            What do you usually do in your free time?
          </p>
        </section>

        {/* AI AUDIO */}
        <section className="mt-5 flex justify-end">
          <div className="flex h-[62px] items-center gap-4 rounded-[22px] bg-gradient-to-r from-[#7138E8] via-[#6255EF] to-[#3678ED] px-4 shadow-[0_10px_30px_rgba(91,67,235,0.22)]">

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
              aria-label="Play AI voice"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </button>

            <div className="flex h-8 items-center gap-[3px]">
              {[10, 18, 27, 16, 23, 30, 18, 25, 12].map(
                (height, index) => (
                  <span
                    key={index}
                    className="w-[3px] rounded-full bg-white/80"
                    style={{ height: `${height}px` }}
                  />
                )
              )}
            </div>

            <span className="text-xs font-medium text-white/75">
              0:12
            </span>
          </div>
        </section>

        {/* USER SPEECH */}
        <section className="mt-5 rounded-[28px] border border-white/[0.09] bg-[#101A3D]/80 px-5 py-5">

          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/90">
              Your speech
            </p>

            {isListening && (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="text-[11px] text-cyan-200/70">
                  Listening
                </span>
              </div>
            )}
          </div>

          <p className="mt-4 min-h-[28px] text-[15px] leading-7 text-white/50">
            {isListening
              ? "Listening to your answer..."
              : "Your words will appear here..."}
          </p>
        </section>

        {/* MICROPHONE AREA */}
        <section className="flex flex-col items-center py-9">

          <button
            onClick={toggleMic}
            aria-label={
              isListening ? "Stop microphone" : "Start microphone"
            }
            className={`relative flex h-[124px] w-[124px] items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_65px_rgba(139,92,246,0.38)]"
                : "bg-gradient-to-br from-[#7439E8] via-[#5C55ED] to-[#3678ED] shadow-[0_0_55px_rgba(99,82,235,0.28)]"
            }`}
          >

            <span className="absolute inset-[9px] rounded-full border border-white/20" />

            <span className="absolute inset-[19px] rounded-full border border-white/10" />

            <svg
              width="43"
              height="43"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="9"
                y="2"
                width="6"
                height="12"
                rx="3"
              />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <path d="M12 17v5" />
              <path d="M8 22h8" />
            </svg>
          </button>

          <h3 className="mt-5 text-[17px] font-semibold">
            {isListening ? "I'm listening..." : "Tap to speak"}
          </h3>

          <p className="mt-1 text-[13px] text-white/35">
            {isListening
              ? "Tap the microphone when you finish"
              : "Speak naturally in English"}
          </p>

          {/* STATIC WAVEFORM */}
          <div className="mt-5 flex h-8 items-center gap-[4px]">
            {[11, 19, 27, 17, 24, 31, 22, 27, 15].map(
              (height, index) => (
                <span
                  key={index}
                  className={`w-[3px] rounded-full ${
                    isListening
                      ? "bg-violet-400/80"
                      : "bg-white/[0.12]"
                  }`}
                  style={{ height: `${height}px` }}
                />
              )
            )}
          </div>
        </section>

        {/* PRACTICE TIPS */}
        <section className="rounded-[28px] border border-white/[0.08] bg-[#101A3D]/70 px-5 py-5">

          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
            Practice tips
          </p>

          <div className="mt-4 space-y-3">

            <div className="flex gap-3">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <p className="text-[13px] leading-5 text-white/50">
                Speak naturally — don't worry about mistakes.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <p className="text-[13px] leading-5 text-white/50">
                Try to answer in complete sentences.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <p className="text-[13px] leading-5 text-white/50">
                Listen carefully and speak with confidence.
              </p>
            </div>

          </div>
        </section>

        {/* BOTTOM NAV */}
        <nav className="mt-5 flex items-center justify-between rounded-[28px] border border-white/[0.08] bg-[#101A3D]/85 px-3 py-4 backdrop-blur-xl">

          {/* HOME */}
          <button className="flex w-[20%] flex-col items-center gap-2 text-white/35">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
            <span className="text-[10px]">Home</span>
          </button>

          {/* PRACTICE */}
          <button className="flex w-[20%] flex-col items-center gap-2 text-white/35">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
            </svg>
            <span className="text-[10px]">Practice</span>
          </button>

          {/* SPEAKMATE */}
          <button className="flex w-[20%] flex-col items-center gap-2 text-violet-300">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="9"
                y="2"
                width="6"
                height="12"
                rx="3"
              />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <path d="M12 17v5" />
              <path d="M8 22h8" />
            </svg>
            <span className="text-[10px]">SpeakMate</span>
          </button>

          {/* PROGRESS */}
          <button className="flex w-[20%] flex-col items-center gap-2 text-white/35">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19V9" />
              <path d="M10 19V5" />
              <path d="M16 19v-7" />
              <path d="M22 19V3" />
            </svg>
            <span className="text-[10px]">Progress</span>
          </button>

          {/* PROFILE */}
          <button className="flex w-[20%] flex-col items-center gap-2 text-white/35">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <span className="text-[10px]">Profile</span>
          </button>

        </nav>
      </div>
    </main>
  );
            }
