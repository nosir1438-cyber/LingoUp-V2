"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");

  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const lastFinalTextRef = useRef("");

  // -----------------------------
  // CHECK SPEECH RECOGNITION
  // -----------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  // -----------------------------
  // START MICROPHONE
  // -----------------------------
  const startListening = async () => {
    if (isListening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      // Ask for microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      audioChunksRef.current = [];

      // -----------------------------
      // AUDIO RECORDING
      // -----------------------------
      const recorder = new MediaRecorder(stream);

      recorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const newUrl = URL.createObjectURL(blob);

        setAudioUrl((oldUrl) => {
          if (oldUrl) {
            URL.revokeObjectURL(oldUrl);
          }

          return newUrl;
        });
      };

      recorder.start();

      // -----------------------------
      // SPEECH RECOGNITION
      // -----------------------------
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";

      // Important:
      // Keep listening until the user presses
      // the microphone again.
      recognition.continuous = true;

      recognition.interimResults = true;

      shouldListenRef.current = true;

      lastFinalTextRef.current = "";

      recognition.onstart = () => {
        setIsListening(true);
      };

      // -----------------------------
      // WHEN USER SPEAKS
      // -----------------------------
      recognition.onresult = (event: any) => {
        let finalParts: string[] = [];
        let temporaryParts: string[] = [];

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i];

          if (!result || !result[0]) continue;

          const text = result[0].transcript.trim();

          if (!text) continue;

          if (result.isFinal) {
            finalParts.push(text);
          } else {
            temporaryParts.push(text);
          }
        }

        // -----------------------------
        // FINAL TEXT
        // -----------------------------
        if (finalParts.length > 0) {
          const newText = finalParts.join(" ").trim();

          if (newText) {
            setTranscript((previous) => {
              const oldText = previous.trim();

              if (!oldText) {
                lastFinalTextRef.current = newText;
                return newText;
              }

              const oldLower = oldText.toLowerCase();
              const newLower = newText.toLowerCase();

              // Exact duplicate
              if (oldLower === newLower) {
                return oldText;
              }

              // Browser repeated the same sentence
              if (
                lastFinalTextRef.current.toLowerCase() ===
                newLower
              ) {
                return oldText;
              }

              // New sentence is already contained
              if (
                oldLower.includes(newLower) &&
                newLower.length > 4
              ) {
                return oldText;
              }

              // Old sentence is contained in the new recognition
              if (
                newLower.includes(oldLower) &&
                oldLower.length > 4
              ) {
                lastFinalTextRef.current = newText;
                return newText;
              }

              lastFinalTextRef.current = newText;

              return `${oldText} ${newText}`;
            });
          }
        }

        // -----------------------------
        // LIVE / TEMPORARY TEXT
        // -----------------------------
        setInterimText(
          temporaryParts.join(" ").trim()
        );
      };

      // -----------------------------
      // ERROR
      // -----------------------------
      recognition.onerror = (event: any) => {
        console.log(
          "Speech recognition error:",
          event.error
        );

        if (event.error === "not-allowed") {
          shouldListenRef.current = false;
          setIsListening(false);
        }
      };

      // -----------------------------
      // AUTO RESTART
      // -----------------------------
      recognition.onend = () => {
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch {}
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;

      recognition.start();
    } catch (error) {
      console.error("Microphone error:", error);

      setIsListening(false);
      shouldListenRef.current = false;
    }
  };

  // -----------------------------
  // STOP MICROPHONE
  // -----------------------------
  const stopListening = () => {
    shouldListenRef.current = false;

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}

      recognitionRef.current = null;
    }

    // Stop audio recorder
    if (
      recorderRef.current &&
      recorderRef.current.state !== "inactive"
    ) {
      try {
        recorderRef.current.stop();
      } catch {}
    }

    recorderRef.current = null;

    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    setIsListening(false);
    setInterimText("");
  };

  // -----------------------------
  // TOGGLE MICROPHONE
  // -----------------------------
  const toggleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // -----------------------------
  // CLEANUP
  // -----------------------------
  useEffect(() => {
    return () => {
      shouldListenRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      if (recorderRef.current) {
        try {
          if (
            recorderRef.current.state !== "inactive"
          ) {
            recorderRef.current.stop();
          }
        } catch {}
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <main className="min-h-screen bg-[#061338] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-6 pt-6">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between">

          <button
            onClick={() => window.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xl text-white/80"
          >
            ←
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold">
              SpeakMate
            </h1>

            <p className="text-[11px] text-white/40">
              Real conversations. Real progress.
            </p>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xl text-white/70"
          >
            ⋮
          </button>

        </div>

        {/* ================= AI AVATAR ================= */}

        <div className="mt-7 flex justify-center">

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/20 shadow-[0_0_60px_rgba(99,102,241,0.35)]">

            <div className="absolute inset-2 rounded-full border border-white/10" />

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500">

              <div className="relative h-9 w-10 rounded-[45%] bg-white">

                <span className="absolute left-2 top-3 h-2 w-2 rounded-full bg-indigo-500" />

                <span className="absolute right-2 top-3 h-2 w-2 rounded-full bg-indigo-500" />

                <span className="absolute bottom-2 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-indigo-500" />

              </div>

            </div>

          </div>

        </div>

        {/* ================= AI MESSAGE ================= */}

        <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">

          <p className="text-[11px] uppercase tracking-[0.18em] text-violet-300">
            SpeakMate AI
          </p>

          <p className="mt-3 text-[17px] font-medium">
            Hi Ruxsora! 👋
          </p>

          <p className="mt-1 text-[15px] leading-6 text-white/60">
            What do you usually do in your free time?
          </p>

        </div>

        {/* ================= AI VOICE ================= */}

        <div className="mt-5 flex justify-end">

          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3">

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              ▶
            </button>

            <div className="flex items-center gap-[3px]">

              <span className="h-3 w-[2px] rounded-full bg-white/60" />
              <span className="h-5 w-[2px] rounded-full bg-white/80" />
              <span className="h-7 w-[2px] rounded-full bg-white" />
              <span className="h-4 w-[2px] rounded-full bg-white/70" />
              <span className="h-6 w-[2px] rounded-full bg-white" />
              <span className="h-3 w-[2px] rounded-full bg-white/60" />

            </div>

            <span className="text-xs text-white/80">
              0:12
            </span>

          </div>

        </div>

        {/* ================= USER SPEECH ================= */}

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">
              Your speech
            </p>

            {isListening && (
              <div className="flex items-center gap-2 text-[10px] text-green-300">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                Listening

              </div>
            )}

          </div>

          <p className="mt-3 min-h-[24px] text-sm leading-6 text-white/75">

            {transcript || "Your words will appear here..."}

          </p>

          {interimText && (
            <p className="mt-1 text-sm leading-6 text-white/35">
              {interimText}
            </p>
          )}

        </div>

        {/* ================= MICROPHONE ================= */}

        <div className="flex flex-1 flex-col items-center justify-center py-8">

          <button
            onClick={toggleMicrophone}
            aria-label={
              isListening
                ? "Stop microphone"
                : "Start microphone"
            }
            className={`relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300 ${
              isListening
                ? "scale-110 bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_80px_rgba(139,92,246,0.65)]"
                : "bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_0_55px_rgba(79,70,229,0.45)]"
            }`}
          >

            {isListening && (
              <span className="absolute inset-[-12px] animate-ping rounded-full border border-violet-400/30" />
            )}

            <span className="absolute inset-2 rounded-full border border-white/20" />

            {/* MICROPHONE SVG */}

            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
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

          <p className="mt-5 text-sm font-semibold">
            {isListening
              ? "I'm listening..."
              : "Tap to speak"}
          </p>

          <p className="mt-1 text-xs text-white/40">
            {isListening
              ? "Tap the microphone when you finish"
              : "Speak naturally in English"}
          </p>

          {/* WAVEFORM */}

          <div className="mt-5 flex h-8 items-center gap-1">

            {[12, 20, 28, 18, 25, 14, 30, 20, 12].map(
              (height, index) => (
                <span
                  key={index}
                  className={`w-[3px] rounded-full ${
                    isListening
                      ? "animate-pulse bg-violet-400"
                      : "bg-white/15"
                  }`}
                  style={{
                    height: `${height}px`,
                  }}
                />
              )
            )}

          </div>

        </div>

        {/* ================= RECORDING ================= */}

        {audioUrl && (

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">

            <div className="mb-3">

              <p className="text-[10px] uppercase tracking-[0.18em] text-violet-300">
                Your recording
              </p>

              <p className="mt-1 text-xs text-white/40">
                Listen to your answer
              </p>

            </div>

            <audio
              controls
              src={audioUrl}
              className="w-full"
            />

          </div>

        )}

        {/* ================= TIPS ================= */}

        <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">

          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
            Practice tips
          </p>

          <div className="mt-3 space-y-2 text-xs text-white/50">

            <p>
              • Speak naturally — don't worry about mistakes.
            </p>

            <p>
              • Try to answer in complete sentences.
            </p>

            <p>
              • Listen to your recording after speaking.
            </p>

          </div>

        </div>

        {/* ================= BROWSER WARNING ================= */}

        {!isSupported && (

          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-center text-xs text-red-200">

            Speech recognition is not supported in this browser.
            Please try Chrome.

          </div>

        )}

        {/* ================= BOTTOM NAV ================= */}

        <nav className="flex items-center justify-around rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur">

          <button className="flex flex-col items-center gap-1 text-white/40">
            <span>⌂</span>
            <span className="text-[9px]">
              Home
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/40">
            <span>✦</span>
            <span className="text-[9px]">
              Practice
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 text-violet-300">
            <span>🎙</span>
            <span className="text-[9px]">
              SpeakMate
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/40">
            <span>◔</span>
            <span className="text-[9px]">
              Progress
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/40">
            <span>○</span>
            <span className="text-[9px]">
              Profile
            </span>
          </button>

        </nav>

      </div>
    </main>
  );
        }
