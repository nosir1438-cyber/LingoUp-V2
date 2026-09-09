"use client";

import { useState } from "react";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

const user = {
  name: "Ruxsora",

  // Keyinchalik bu qiymatlar database / assessment natijasidan keladi.
  currentLevel: "B1" as Level,
  targetLevel: "B2" as Level,
  levelProgress: 65,

  streak: 7,

  weeklyActivity: [true, true, true, true, true, true, false],
};

const levelOrder: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

function getNextLevel(level: Level): Level | null {
  const index = levelOrder.indexOf(level);
  return index >= 0 && index < levelOrder.length - 1
    ? levelOrder[index + 1]
    : null;
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect
        x="8"
        y="3"
        width="8"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3v-3H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
      <circle cx="12" cy="11.5" r="1" fill="currentColor" />
      <circle cx="16" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="m12 3 2.7 5.45 6.02.88-4.36 4.25 1.03 6-5.39-2.83-5.39 2.83 1.03-6-4.36-4.25 6.02-.88L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function GrammarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle
        cx="10"
        cy="10"
        r="6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m14.5 14.5 5 5M7.5 10h5M10 7.5v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m6 12 4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M5 19V10M12 19V5M19 19v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 21a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");

  const nextLevel =
    user.targetLevel || getNextLevel(user.currentLevel) || user.currentLevel;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071642] text-[#102052]">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/30 blur-[110px]" />
        <div className="absolute -right-40 top-80 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />

        <div className="absolute left-[-100px] top-[430px] h-[2px] w-[600px] rotate-[-17deg] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[1px]" />

        <div className="absolute right-[-150px] top-[330px] h-[2px] w-[600px] rotate-[20deg] bg-gradient-to-r from-transparent via-violet-300/70 to-transparent" />
      </div>

      {/* MOBILE APP SHELL */}
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-[#0a1d5b] via-[#102b76] to-[#f7f9ff] shadow-2xl">

        {/* TOP AREA */}
        <section className="relative px-6 pb-8 pt-7 text-white">

          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-28 top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />

          {/* HEADER */}
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[13px] font-medium text-blue-100/80">
                Good morning,
              </p>

              <h1 className="mt-1 text-[28px] font-extrabold tracking-tight">
                {user.name} ☀️
              </h1>

              <p className="mt-1 text-[12px] text-blue-100/75">
                Small steps make big progress!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl"
              >
                <span className="text-lg">♧</span>
              </button>

              <button
                aria-label="Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 bg-gradient-to-br from-violet-400 to-blue-400 text-lg font-bold shadow-lg"
              >
                R
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="relative mt-6 grid grid-cols-2 gap-3">

            {/* STREAK */}
            <div className="rounded-[22px] bg-white p-4 text-[#13265d] shadow-[0_15px_35px_rgba(0,0,0,0.18)]">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">🔥</span>
                <span className="text-[12px] font-bold text-orange-500">
                  {user.streak} day streak
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.weeklyActivity[index]
                          ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]"
                          : "bg-slate-300"
                      }`}
                    />
                    <span className="text-[9px] font-semibold text-slate-400">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LEVEL */}
            <div className="rounded-[22px] bg-white p-4 text-[#13265d] shadow-[0_15px_35px_rgba(0,0,0,0.18)]">
              <p className="text-[10px] font-semibold text-slate-400">
                Your level
              </p>

              <div className="mt-1 text-[20px] font-extrabold tracking-tight">
                {user.currentLevel}{" "}
                <span className="text-blue-500">→</span>{" "}
                {nextLevel}
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                  style={{ width: `${user.levelProgress}%` }}
                />
              </div>

              <p className="mt-1 text-right text-[10px] font-bold text-blue-500">
                {user.levelProgress}%
              </p>
            </div>
          </div>
        </section>

        {/* WHITE CONTENT */}
        <section className="relative rounded-t-[34px] bg-gradient-to-b from-white via-[#f9faff] to-[#f2f5ff] px-5 pb-28 pt-7">

          {/* CONTINUE LEARNING */}
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[17px] font-extrabold tracking-tight">
              Continue learning
            </h2>

            <button className="text-[12px] font-bold text-blue-500">
              See all <span className="text-base">›</span>
            </button>
          </div>

          <div className="space-y-2.5">

            {/* PRONUNCIATION */}
            <button className="group flex w-full items-center gap-3 rounded-[22px] border border-blue-100 bg-white/80 p-3 text-left shadow-[0_8px_25px_rgba(60,80,150,0.08)] backdrop-blur-xl transition active:scale-[0.985]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-300/30">
                <MicIcon />
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-extrabold">
                  Pronunciation
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Perfect your accent
                </p>
              </div>

              <div className="text-blue-500 transition group-hover:translate-x-0.5">
                <Chevron />
              </div>
            </button>

            {/* SPEAKMATE */}
            <button className="group flex w-full items-center gap-3 rounded-[22px] border border-blue-100 bg-white/80 p-3 text-left shadow-[0_8px_25px_rgba(60,80,150,0.08)] backdrop-blur-xl transition active:scale-[0.985]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 text-white shadow-lg shadow-cyan-200/40">
                <ChatIcon />
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-extrabold">
                  SpeakMate
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Chat with AI
                </p>
              </div>

              <div className="text-blue-500">
                <Chevron />
              </div>
            </button>

            {/* IELTS */}
            <button className="group flex w-full items-center gap-3 rounded-[22px] border border-blue-100 bg-white/80 p-3 text-left shadow-[0_8px_25px_rgba(60,80,150,0.08)] backdrop-blur-xl transition active:scale-[0.985]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-200/40">
                <StarIcon />
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-extrabold">
                  IELTS Speaking
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Real test experience
                </p>
              </div>

              <div className="text-blue-500">
                <Chevron />
              </div>
            </button>
          </div>

          {/* QUICK ACCESS */}
          <div className="mb-3 mt-7">
            <h2 className="text-[17px] font-extrabold tracking-tight">
              Quick access
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <button className="flex min-h-[90px] flex-col items-center justify-center rounded-[20px] border border-blue-50 bg-white shadow-[0_7px_22px_rgba(60,80,150,0.06)] transition active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <BookIcon />
              </div>
              <span className="mt-2 text-[9px] font-bold text-[#17347c]">
                Vocabulary
              </span>
            </button>

            <button className="flex min-h-[90px] flex-col items-center justify-center rounded-[20px] border border-blue-50 bg-white shadow-[0_7px_22px_rgba(60,80,150,0.06)] transition active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <GrammarIcon />
              </div>
              <span className="mt-2 text-[9px] font-bold text-[#17347c]">
                Grammar
              </span>
            </button>

            <button className="flex min-h-[90px] flex-col items-center justify-center rounded-[20px] border border-blue-50 bg-white shadow-[0_7px_22px_rgba(60,80,150,0.06)] transition active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                <TargetIcon />
              </div>
              <span className="mt-2 text-[9px] font-bold text-[#17347c]">
                IELTS
              </span>
            </button>

            <button className="flex min-h-[90px] flex-col items-center justify-center rounded-[20px] border border-blue-50 bg-white shadow-[0_7px_22px_rgba(60,80,150,0.06)] transition active:scale-95">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckIcon />
              </div>
              <span className="mt-2 text-[9px] font-bold text-[#17347c]">
                Daily Practice
              </span>
            </button>
          </div>

          {/* PRACTICE TIPS */}
          <section className="relative mt-5 overflow-hidden rounded-[25px] bg-gradient-to-br from-[#081b57] via-[#142b79] to-[#2836a4] p-5 text-white shadow-[0_15px_35px_rgba(20,35,100,0.25)]">
            <div className="pointer-events-none absolute -right-12 -top-10 h-32 w-32 rounded-full border border-cyan-300/30 bg-gradient-to-br from-violet-400/30 to-cyan-300/10 blur-sm" />

            <div className="relative flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-xl">
                💡
              </div>

              <div>
                <h3 className="text-[14px] font-extrabold">
                  Practice tips
                </h3>

                <p className="mt-2 max-w-[270px] text-[11px] leading-5 text-blue-100/90">
                  Focus on clear pronunciation, natural rhythm, and speaking
                  with confidence.
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-white/10 bg-[#071642]/95 px-3 py-3 text-white shadow-[0_-10px_35px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className="grid grid-cols-5">
            {[
              ["Home", <HomeIcon key="home" active={activeTab === "Home"} />],
              [
                "Practice",
                <TargetIcon key="practice" />,
              ],
              ["IELTS", <StarIcon key="ielts" />],
              ["Progress", <ProgressIcon key="progress" />],
              ["Profile", <ProfileIcon key="profile" />],
            ].map(([label, icon]) => {
              const active = activeTab === label;

              return (
                <button
                  key={label as string}
                  onClick={() => setActiveTab(label as string)}
                  className={`flex flex-col items-center gap-1 transition ${
                    active
                      ? "text-violet-300"
                      : "text-blue-200/60 hover:text-white"
                  }`}
                >
                  {icon}

                  <span className="text-[9px] font-semibold">
                    {label as string}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </main>
  );
        }
