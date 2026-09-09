"use client";

import { useRef, useState } from "react";

export default function SpeakMate() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef(false);

  const goBack = () => {
    window.history.back();
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    shouldKeepListeningRef.current = true;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      if (finalText) {
        setTranscript((previous) =>
          `${previous} ${finalText}`.trim()
        );
      } else if (interimText) {
        console.log("Listening:", interimText);
      }
    };

    recognition.onerror = (event: any) => {
      console.log("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        shouldKeepListeningRef.current = false;
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      /*
       * Browser recognition sometimes stops by itself.
       * If the user has NOT pressed the microphone again,
       * start listening again.
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

    try {
      recognition.start();
    } catch (error) {
      console.log("Speech recognition start:", error);
      setIsListening(false);
      shouldKeepListeningRef.current = false;
    }
  };

  const stopListening = () => {
    /*
     * This is the ONLY way the user intentionally
     * turns the microphone off.
     */
    shouldKeepListeningRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto min-h-screen max-w-[430px] overflow-hidden bg-[#061338]">

        {/* BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-[-180px] top-[250px] h-[400px] w-[650px] rotate-[15deg] rounded-[50%] border-[35px] border-violet-600/20 blur-[25px]" />

          <div className="absolute left-[-160px] top-[340px] h-[300px] w-[650px] rotate-[15deg] rounded-[50%] border-[25px] border-blue-500/20 blur-[20px]" />

          <div className="absolute right-[-200px] top-[470px] h-[300px] w-[650px] rotate-[-18deg] rounded-[50%] border-[25px] border-fuchsia-500/15 blur-[25px]" />

          <div className="absolute bottom-[-180px] left-1/2 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        </div>

        <div className="relative z-10 min-h-screen px-5">

          {/* HEADER */}
          <header className="flex items-center justify-between pt-5">

            <button
              onClick={goBack}
              className="flex h-9 w-9 items-center justify-center text-[29px] font-light text-white"
              aria-label="Back"
            >
              ‹
            </button>

            <div className="text-center">

              <h1 className="text-[16px] font-semibold tracking-tight">
                SpeakMate
              </h1>

              <p className="mt-1 text-[10px] text-white/55">
                Real conversations. Real progress.
              </p>

            </div>

            <button
              className="flex h-9 w-9 items-center justify-center text-[22px] text-white/80"
              aria-label="More"
            >
              ⋮
            </button>

          </header>

          {/* AI MESSAGE */}
          <section className="mt-9 flex items-start gap-3">

            <div className="relative mt-1 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-violet-300/50 bg-[#0b1741] shadow-[0_0_25px_rgba(93,92,255,0.35)]">

              <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-violet-500/80 to-blue-400/70 opacity-70 blur-[2px]" />

              <div className="relative flex h-[31px] w-[31px] items-center justify-center rounded-[10px] border border-cyan-200/60 bg-[#07132f] shadow-[0_0_12px_rgba(72,220,255,.4)]">

                <div className="flex gap-[5px]">

                  <span className="h-[5px] w-[5px] rounded-full bg-cyan-300" />

                  <span className="h-[5px] w-[5px] rounded-full bg-cyan-300" />

                </div>

              </div>

            </div>

            <div className="max-w-[255px] rounded-[19px] rounded-tl-[5px] bg-[#f7f8ff] px-[18px] py-[13px] shadow-[0_8px_25px_rgba(0,0,0,.18)]">

              <p className="text-[12px] font-semibold leading-5 text-[#15204a]">
                Hi Ruxsora! 👋
              </p>

              <p className="mt-[1px] text-[12px] leading-[18px] text-[#15204a]">
                What do you usually do
                <br />
                in your free time?
              </p>

            </div>

          </section>

          {/* AI VOICE */}
          <section className="ml-[61px] mt-3 flex h-[43px] w-[245px] items-center rounded-[14px] bg-gradient-to-r from-[#744cff] via-[#625eff] to-[#318dfd] px-3 shadow-[0_8px_25px_rgba(66,77,255,.25)]">

            <button
              className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px]"
              aria-label="Play"
            >
              ▶
            </button>

            <div className="ml-3 flex h-7 flex-1 items-center justify-center gap-[2px]">

              {[7, 12, 17, 10, 22, 13, 18, 25, 11, 20, 14, 27, 10, 18, 23, 13, 20, 9, 17, 25, 12, 19, 8, 15].map(
                (height, index) => (
                  <span
                    key={index}
                    className="w-[2px] rounded-full bg-white/85"
                    style={{ height: `${height}px` }}
                  />
                )
              )}

            </div>

            <span className="ml-2 text-[10px] font-medium">
              0:12
            </span>

          </section>

          {/* MICROPHONE */}
          <section className="mt-[74px] flex flex-col items-center">

            <button
              onClick={toggleListening}
              className="relative flex h-[126px] w-[126px] items-center justify-center rounded-full"
              aria-label={
                isListening
                  ? "Stop listening"
                  : "Start speaking"
              }
            >

              <span className="absolute inset-[-18px] rounded-full border border-blue-400/10" />

              <span className="absolute inset-[-10px] rounded-full border border-violet-400/20" />

              <span
                className={`absolute inset-[-2px] rounded-full border border-cyan-300/40 ${
                  isListening ? "animate-pulse" : ""
                }`}
              />

              <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-violet-600/60 via-blue-500/40 to-cyan-400/60 blur-[10px]" />

              <span className="absolute inset-[12px] rounded-full bg-gradient-to-br from-[#b35cff] via-[#6658ff] to-[#20c5ff] shadow-[inset_0_0_25px_rgba(255,255,255,.4),0_0_45px_rgba(80,100,255,.6)]" />

              <span className="absolute inset-[21px] rounded-full border border-white/45 bg-white/10 shadow-[inset_0_0_18px_rgba(255,255,255,.2)] backdrop-blur-md" />

              {/* MICROPHONE SVG */}
              <svg
                className="relative z-10 h-[48px] w-[48px] text-white drop-shadow-[0_0_12px_rgba(255,255,255,.9)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <rect
                  x="8"
                  y="2.5"
                  width="8"
                  height="12"
                  rx="4"
                />

                <path d="M5 11.5a7 7 0 0 0 14 0" />

                <path d="M12 18.5v3" />

                <path d="M9 21.5h6" />

              </svg>

            </button>

            <p className="mt-[27px] text-[13px] font-medium tracking-tight text-white">
              {isListening
                ? "I'm listening..."
                : "Tap to speak"}
            </p>

            {/* WAVEFORM */}
            <div className="mt-[18px] flex h-[34px] items-center gap-[3px]">

              {[6, 11, 17, 10, 21, 14, 26, 11, 19, 28, 14, 23, 31, 17, 26, 12, 22, 30, 16, 25, 11, 19, 28, 13, 21, 9, 16, 25, 12, 20].map(
                (height, index) => (
                  <span
                    key={index}
                    className="w-[2px] rounded-full bg-gradient-to-t from-blue-400 via-violet-400 to-cyan-300"
                    style={{ height: `${height}px` }}
                  />
                )
              )}

            </div>

          </section>

          {/* USER TRANSCRIPT */}
          {transcript && (
            <section className="mx-auto mt-5 max-w-[350px] rounded-[18px] border border-violet-300/20 bg-white/5 px-4 py-3">

              <p className="text-[9px] uppercase tracking-wider text-violet-300">
                You said
              </p>

              <p className="mt-1 text-[12px] leading-5 text-white/90">
                {transcript}
              </p>

            </section>
          )}

          {/* BROWSER WARNING */}
          {!isSupported && (
            <div className="mx-auto mt-5 max-w-[330px] rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-center text-[11px] text-red-200">
              Voice recognition is not supported in this browser.
              Please try Chrome on your phone.
            </div>
          )}

          {/* PRACTICE TIPS */}
          <section className="mt-[24px] rounded-[19px] border border-white/10 bg-[#14234c]/80 px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,.2)] backdrop-blur-xl">

            <div className="flex items-center gap-3">

              <div className="flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full bg-[#24365f] text-[21px] shadow-inner">
                💡
              </div>

              <div>

                <h2 className="text-[12px] font-semibold">
                  Practice tips
                </h2>

                <p className="mt-[3px] text-[10px] leading-[15px] text-white/55">
                  Try to speak naturally.
                  <br />
                  There’s no right or wrong answer.
                </p>

              </div>

            </div>

          </section>

          {/* BOTTOM NAV */}
          <nav className="mt-5 flex items-center justify-between border-t border-white/10 pb-5 pt-4">

            <button
              onClick={goBack}
              className="flex flex-col items-center gap-1 text-white/40"
            >
              <span className="text-[18px]">⌂</span>
              <span className="text-[9px]">Home</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-[18px]">◌</span>
              <span className="text-[9px]">Practice</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-violet-300">
              <span className="text-[19px]">◉</span>
              <span className="text-[9px]">SpeakMate</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-[18px]">▥</span>
              <span className="text-[9px]">Progress</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white/40">
              <span className="text-[18px]">♙</span>
              <span className="text-[9px]">Profile</span>
            </button>

          </nav>

        </div>
      </div>
    </main>
  );
    }
