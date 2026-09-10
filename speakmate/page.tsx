"use client";

import { useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050817] text-white">
      {/* ABSTRACT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="absolute right-[-120px] top-[15%] h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute bottom-[-150px] left-[20%] h-96 w-96 rounded-full bg-indigo-600/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(111,76,255,0.13),transparent_35%)]" />

        <div className="absolute left-[-10%] top-[42%] h-[1px] w-[120%] rotate-[-7deg] bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
        <div className="absolute left-[-10%] top-[48%] h-[1px] w-[120%] rotate-[5deg] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-6 pt-6">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl transition hover:bg-white/10"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <span className="text-sm font-black">L</span>
            </div>

            <div>
              <p className="text-[15px] font-bold tracking-tight">
                LingoUp
              </p>
              <p className="text-[9px] text-white/35">
                SPEAKMATE
              </p>
            </div>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/60 backdrop-blur-xl">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </header>

        {/* TITLE */}
        <section className="mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-300/80">
            AI Conversation
          </p>

          <h1 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.04em]">
            Speak freely.
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Get better naturally.
            </span>
          </h1>

          <p className="mt-3 max-w-[320px] text-[13px] leading-5 text-white/40">
            Have a real conversation with your AI speaking partner.
          </p>
        </section>

        {/* CONVERSATION CARD */}
        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">

          <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
                Conversation
              </p>

              <p className="mt-1 text-[13px] text-white/65">
                Daily English
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
              <span className="text-[9px] text-emerald-300">
                AI READY
              </span>
            </div>
          </div>

          {/* QUESTION */}
          <div className="relative mt-6">
            <p className="text-[11px] font-medium text-violet-300">
              SpeakMate
            </p>

            <p className="mt-2 text-[19px] font-medium leading-7 tracking-[-0.02em]">
              What do you usually do
              <br />
              in your free time?
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </button>

              <div className="flex h-6 items-center gap-[3px]">
                {[8, 14, 21, 12, 25, 17, 22, 11, 18, 8].map(
                  (height, index) => (
                    <span
                      key={index}
                      className="w-[2px] rounded-full bg-violet-300/60"
                      style={{ height }}
                    />
                  )
                )}
              </div>

              <span className="text-[10px] text-white/30">
                0:12
              </span>
            </div>
          </div>
        </section>

        {/* YOUR SPEECH */}
        <section className="mt-4 rounded-[25px] border border-white/10 bg-black/10 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Your speech
            </p>

            {isListening && (
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <span className="text-[9px] text-cyan-300">
                  LISTENING
                </span>
              </div>
            )}
          </div>

          <p className="mt-3 min-h-[24px] text-[13px] leading-5 text-white/35">
            {isListening
              ? "I'm listening to you..."
              : "Your spoken answer will appear here."}
          </p>
        </section>

        {/* VOICE EXPERIENCE */}
        <section className="flex flex-1 flex-col items-center justify-center py-8">

          {/* LIVE RINGS */}
          <div className="relative flex h-[190px] w-[190px] items-center justify-center">

            <div
              className={`absolute h-[190px] w-[190px] rounded-full border border-violet-400/10 ${
                isListening ? "animate-pulse" : ""
              }`}
            />

            <div
              className={`absolute h-[160px] w-[160px] rounded-full border border-blue-400/10 ${
                isListening ? "scale-110 transition-transform duration-700" : ""
              }`}
            />

            <div className="absolute h-[132px] w-[132px] rounded-full bg-gradient-to-br from-violet-600/20 via-indigo-500/10 to-blue-500/20 blur-xl" />

            {/* MICROPHONE */}
            <button
              onClick={() => setIsListening(!isListening)}
              aria-label="Toggle microphone"
              className={`relative z-10 flex h-[108px] w-[108px] items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 shadow-[0_0_60px_rgba(109,77,255,.35)] transition-all duration-500 ${
                isListening
                  ? "scale-105 shadow-[0_0_90px_rgba(34,211,238,.35)]"
                  : "hover:scale-105"
              }`}
            >
              <div className="absolute inset-2 rounded-full border border-white/20" />

              <svg
                width="38"
                height="38"
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
          </div>

          <h2 className="mt-2 text-[17px] font-semibold">
            {isListening ? "Listening..." : "Tap to speak"}
          </h2>

          <p className="mt-1 text-[11px] text-white/30">
            {isListening
              ? "Speak naturally. I'm listening."
              : "Don't worry about making mistakes."}
          </p>

          {/* LIVE WAVE */}
          <div className="mt-5 flex h-8 items-center gap-1">
            {[7, 12, 20, 27, 18, 25, 14, 23, 30, 17, 24, 11, 19].map(
              (height, index) => (
                <span
                  key={index}
                  className={`w-[3px] rounded-full transition-all duration-300 ${
                    isListening
                      ? "bg-gradient-to-t from-violet-500 to-cyan-300"
                      : "bg-white/10"
                  }`}
                  style={{
                    height: isListening
                      ? `${height}px`
                      : "6px",
                  }}
                />
              )
            )}
          </div>
        </section>

        {/* QUICK INFO */}
        <section className="grid grid-cols-3 gap-2">
          <InfoCard
            label="LEVEL"
            value="B1"
          />

          <InfoCard
            label="MODE"
            value="Natural"
          />

          <InfoCard
            label="SESSION"
            value="12 min"
          />
        </section>

        {/* BOTTOM NAV */}
        <nav className="mt-5 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.045] px-2 py-2 backdrop-blur-2xl">
          <NavItem
            label="Home"
            icon="⌂"
          />

          <NavItem
            label="Practice"
            icon="✦"
          />

          <NavItem
            label="Speak"
            icon="◉"
            active
          />

          <NavItem
            label="Progress"
            icon="◔"
          />

          <NavItem
            label="Profile"
            icon="○"
          />
        </nav>
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 backdrop-blur-xl">
      <p className="text-[8px] font-semibold tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-medium text-white/70">
        {value}
      </p>
    </div>
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
      className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition ${
        active
          ? "bg-violet-500/10 text-violet-300"
          : "text-white/25"
      }`}
    >
      <span className="text-[17px]">{icon}</span>

      <span className="text-[8px] font-medium">
        {label}
      </span>
    </button>
  );
        }
