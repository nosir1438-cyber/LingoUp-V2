"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Speech Recognition support
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  // Start microphone + speech recognition
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
      // Microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      // Audio recording
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(audioBlob);

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }

        setAudioUrl(url);
      };

      recorder.start();
      setIsRecording(true);

      // Speech recognition
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      shouldKeepListeningRef.current = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        /*
          MUHIM:
          Biz faqat event.resultIndex dan boshlab
          yangi natijalarni olamiz.

          Shu sababli brauzer oldingi resultlarni
          qayta yuborsa, ularni yana transcriptga
          qo‘shib yubormaymiz.
        */

        let newFinalText = "";
        let currentInterimText = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result = event.results[i];

          const text = result[0].transcript.trim();

          if (result.isFinal) {
            newFinalText += text + " ";
          } else {
            currentInterimText += text + " ";
          }
        }

        if (newFinalText.trim()) {
          setTranscript((previous) => {
            const cleanNewText = newFinalText.trim();

            if (!previous.trim()) {
              return cleanNewText;
            }

            // Bir xil gapni qayta qo‘shib yubormaslik
            const previousClean = previous.trim();

            if (
              previousClean.toLowerCase().endsWith(
                cleanNewText.toLowerCase()
              )
            ) {
              return previousClean;
            }

            return `${previousClean} ${cleanNewText}`;
          });
        }

        // Interim result ekranda ko‘rinishi uchun
        // alohida vaqtinchalik state ishlatmaymiz.
        // Final transcript barqaror saqlanadi.
        void currentInterimText;
      };

      recognition.onerror = (event: any) => {
        console.log("Speech recognition error:", event.error);

        if (event.error === "not-allowed") {
          shouldKeepListeningRef.current = false;
          setIsListening(false);
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        /*
          Foydalanuvchi hali STOP bosmagan bo‘lsa,
          recognition o‘z-o‘zidan tugab qolsa,
          yana ishga tushadi.
        */

        if (shouldKeepListeningRef.current) {
          try {
            recognition.start();
          } catch (error) {
            console.log("Recognition restart:", error);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;

      recognition.start();
    } catch (error) {
      console.error("Microphone error:", error);
      setIsListening(false);
      setIsRecording(false);
    }
  };

  // Stop microphone + recording
  const stopListening = () => {
    shouldKeepListeningRef.current = false;

    // Speech recognition stop
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log(error);
      }

      recognitionRef.current = null;
    }

    // Audio recorder stop
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    mediaRecorderRef.current = null;

    // Release microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setIsListening(false);
    setIsRecording(false);
  };

  // Toggle
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      shouldKeepListeningRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }

      if (mediaRecorderRef.current) {
        try {
          if (mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
          }
        } catch {}
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <main className="min-h-screen bg-[#061338] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-6 pt-6">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/80"
          >
            ←
          </button>

          <div className="text-center">
            <h1 className="text-xl font-bold">SpeakMate</h1>
            <p className="mt-1 text-[11px] text-white/45">
              Real conversations. Real progress.
            </p>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white/70">
            ⋮
          </button>
        </header>

        {/* AI AVATAR */}
        <div className="mt-7 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 via-blue-500/20 to-cyan-400/20 shadow-[0_0_60px_rgba(99,102,241,0.35)]">
            <div className="absolute inset-2 rounded-full border border-violet-300/20" />

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg">
              <div className="relative h-9 w-10 rounded-[45%] bg-white/95">
                <span className="absolute left-2 top-3 h-2 w-2 rounded-full bg-[#5865f2]" />
                <span className="absolute right-2 top-3 h-2 w-2 rounded-full bg-[#5865f2]" />
                <span className="absolute bottom-2 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-[#5865f2]" />
              </div>
            </div>
          </div>
        </div>

        {/* AI MESSAGE */}
        <section className="mt-7 rounded-[26px] border border-white/10 bg-white/[0.07] p-5 shadow-xl backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300">
            SpeakMate AI
          </p>

          <p className="mt-3 text-[17px] font-medium leading-7 text-white">
            Hi Ruxsora! 👋
          </p>

          <p className="mt-1 text-[15px] leading-6 text-white/65">
            What do you usually do in your free time?
          </p>
        </section>

        {/* AI VOICE */}
        <div className="mt-5 flex justify-end">
          <div className="flex items-center gap-3 rounded-[22px] bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 shadow-lg shadow-blue-900/20">
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
              <span className="h-5 w-[2px] rounded-full bg-white/80" />
            </div>

            <span className="text-xs text-white/80">0:12</span>
          </div>
        </div>

        {/* USER TRANSCRIPT */}
        <section className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Your speech
            </p>

            {isListening && (
              <span className="flex items-center gap-2 text-[10px] text-green-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Listening
              </span>
            )}
          </div>

          <p className="mt-3 min-h-[24px] text-sm leading-6 text-white/75">
            {transcript || "Your words will appear here..."}
          </p>
        </section>

        {/* MICROPHONE */}
        <div className="flex flex-1 flex-col items-center justify-center py-7">

          <button
            onClick={toggleListening}
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

            {/* SVG MICROPHONE */}
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

          <p className="mt-5 text-sm font-semibold text-white">
            {isListening ? "I'm listening..." : "Tap to speak"}
          </p>

          <p className="mt-1 text-xs text-white/40">
            {isListening
              ? "Tap the microphone when you finish"
              : "Speak naturally in English"}
          </p>

          {/* LIVE WAVEFORM */}
          <div className="mt-5 flex h-8 items-center gap-1">
            {[12, 20, 28, 18, 25, 14, 30, 20, 12, 24, 16].map(
              (height, index) => (
                <span
                  key={index}
                  className={`w-[3px] rounded-full transition-all ${
                    isListening
                      ? "animate-pulse bg-violet-400"
                      : "bg-white/15"
                  }`}
                  style={{ height: `${height}px` }}
                />
              )
            )}
          </div>
        </div>

        {/* YOUR RECORDING */}
        {audioUrl && (
          <section className="mb-5 rounded-[22px] border border-violet-400/20 bg-violet-500/[0.08] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                  Your recording
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Listen to what you said
                </p>
              </div>

              <span className="text-xl">🔊</span>
            </div>

            <audio
              controls
              src={audioUrl}
              className="w-full"
            />
          </section>
        )}

        {/* PRACTICE TIPS */}
        <section className="mb-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            Practice tips
          </p>

          <div className="mt-3 space-y-2 text-xs text-white/55">
            <p>• Speak naturally — don't worry about mistakes.</p>
            <p>• Try to answer in complete sentences.</p>
            <p>• You can listen to your recording afterwards.</p>
          </div>
        </section>

        {/* UNSUPPORTED WARNING */}
        {!isSupported && (
          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-center text-xs text-red-200">
            Speech recognition is not supported in this browser.
            Please try Chrome.
          </div>
        )}

        {/* BOTTOM NAV */}
        <nav className="flex items-center justify-around rounded-[25px] border border-white/10 bg-white/[0.05] px-2 py-3 backdrop-blur">
          <button className="flex flex-col items-center gap-1 text-white/45">
            <span>⌂</span>
            <span className="text-[9px]">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/45">
            <span>✦</span>
            <span className="text-[9px]">Practice</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-violet-300">
            <span>🎙</span>
            <span className="text-[9px]">SpeakMate</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/45">
            <span>◔</span>
            <span className="text-[9px]">Progress</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white/45">
            <span>○</span>
            <span className="text-[9px]">Profile</span>
          </button>
        </nav>
      </div>
    </main>
  );
      }
