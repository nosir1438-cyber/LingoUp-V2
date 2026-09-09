"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Tap the microphone and start speaking");
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("Listening...");
    };

    recognition.onresult = (event: any) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setStatus("Microphone permission was denied.");
      } else if (event.error === "no-speech") {
        setStatus("I didn't hear anything. Try again.");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      if (transcript.trim()) {
        setStatus("Got it. Your answer is ready.");
      } else {
        setStatus("Tap the microphone and start speaking");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [transcript]);

  const toggleMicrophone = () => {
    if (!supported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    setTranscript("");
    setStatus("Listening...");

    try {
      recognitionRef.current?.start();
    } catch {
      // Prevent duplicate start errors.
    }
  };

  const clearAnswer = () => {
    setTranscript("");
    setStatus("Tap the microphone and start speaking");
  };

  return (
    <main className="min-h-screen bg-[#070A18] text-white">
      {/* Cosmic background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-[-100px] h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute right-[-120px] top-[120px] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[-100px] left-[20%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-md px-5 pb-8 pt-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl"
            aria-label="Go back"
          >
            ←
          </button>

          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">
              LingoUp
            </p>
            <h1 className="mt-1 text-xl font-bold">SpeakMate</h1>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            aria-label="Settings"
          >
            ⚙
          </button>
        </header>

        {/* AI status */}
        <section className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <div className="text-2xl">✦</div>

              <span
                className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#101326] ${
                  isListening ? "bg-green-400" : "bg-white/40"
                }`}
              />
            </div>

            <div>
              <p className="text-sm text-white/50">Your AI speaking partner</p>
              <h2 className="mt-1 text-xl font-bold">Speak naturally</h2>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-black/20 p-4">
            <p className="text-sm leading-6 text-white/60">{status}</p>
          </div>
        </section>

        {/* Conversation */}
        <section className="mt-5 rounded-[30px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Your answer</h2>

            {transcript && (
              <button
                onClick={clearAnswer}
                className="text-xs font-medium text-white/40 transition hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 min-h-[150px] rounded-2xl border border-white/10 bg-black/20 p-4">
            {transcript ? (
              <p className="text-[16px] leading-7 text-white/90">
                {transcript}
              </p>
            ) : (
              <p className="text-sm leading-6 text-white/30">
                Your spoken answer will appear here...
              </p>
            )}
          </div>
        </section>

        {/* Microphone */}
        <section className="mt-7 flex flex-col items-center">
          <button
            onClick={toggleMicrophone}
            disabled={!supported}
            className={`relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "scale-110 bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_60px_rgba(99,102,241,0.45)]"
                : "bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_0_40px_rgba(99,102,241,0.25)] hover:scale-105"
            }`}
          >
            {isListening && (
              <>
                <span className="absolute inset-[-10px] animate-ping rounded-full border border-violet-400/30" />
                <span className="absolute inset-[-18px] rounded-full border border-blue-400/10" />
              </>
            )}

            <span className="relative text-3xl">
              {isListening ? "■" : "🎙️"}
            </span>
          </button>

          <p className="mt-4 text-sm font-medium text-white/60">
            {isListening ? "Listening..." : "Tap to speak"}
          </p>
        </section>

        {/* Unsupported browser message */}
        {!supported && (
          <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-center text-sm leading-6 text-yellow-200">
            Speech recognition is not available in this browser. Try opening
            LingoUp in a browser that supports microphone speech recognition.
          </div>
        )}

        {/* Goal */}
        <section className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Speaking goal
          </p>

          <h3 className="mt-2 text-lg font-bold">
            Speak clearly and naturally
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/45">
            Don't worry about mistakes. Speak naturally and LingoUp will help
            you improve step by step.
          </p>
        </section>

        {/* Bottom navigation */}
        <nav className="mt-8 grid grid-cols-5 rounded-[26px] border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl">
          {[
            ["⌂", "Home", "/"],
            ["◉", "Practice", "/practice"],
            ["🎙", "Speak", "/speakmate"],
            ["▥", "Progress", "/progress"],
            ["◯", "Profile", "/profile"],
          ].map(([icon, label, href]) => (
            <button
              key={label}
              onClick={() => {
                window.location.href = href;
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-3 text-[10px] transition ${
                label === "Speak"
                  ? "bg-white/10 text-violet-300"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
      }
