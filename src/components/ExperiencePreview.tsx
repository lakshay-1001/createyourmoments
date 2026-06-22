import { useState } from "react";
import confetti from "canvas-confetti";
export default function ExperiencePreview() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  function reveal() {
    setOpen(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.65 } });
  }
  return (
    <div className="mx-auto max-w-sm rounded-[2rem] bg-white p-4 shadow-glow">
      <div className="relative min-h-[560px] overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-cream via-white to-blush/30 p-6 text-center">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,white,transparent_40%)]" />
        {!open ? (
          <div className="relative z-10 flex min-h-[510px] flex-col items-center justify-center">
            <p className="caps text-primary mb-8">A special moment waits</p>
            <button
              onClick={reveal}
              className="group relative h-36 w-48 rounded-2xl bg-primary shadow-glow"
            >
              <div className="absolute inset-x-4 top-6 h-20 rounded-xl bg-cream transition group-hover:-translate-y-4" />
              <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-2xl bg-secondary" />
              <span className="absolute inset-0 flex items-center justify-center pt-20 font-serif text-2xl text-white">
                Open
              </span>
            </button>
            <p className="mt-8 text-muted">Tap the envelope to start</p>
          </div>
        ) : (
          <div className="relative z-10 pt-8">
            <p className="caps text-primary">Unlocked Memory</p>
            <h3 className="mt-3 font-serif text-4xl font-bold">
              The Story Begins
            </h3>
            <div className="mt-8 grid gap-4">
              {["First hello", "Favorite memory", "Final surprise"].map(
                (s, i) => (
                  <button
                    key={s}
                    onClick={() => setStep(i)}
                    className={`rounded-2xl border p-4 text-left transition ${step === i ? "border-primary bg-cream" : "border-outline/50 bg-white/60"}`}
                  >
                    <span className="font-bold">{s}</span>
                    <p className="text-sm text-muted">
                      Click to reveal this moment
                    </p>
                  </button>
                ),
              )}
            </div>
            <div className="mt-8 rounded-2xl bg-white p-5 shadow-ambient">
              <p className="font-serif text-2xl">
                {
                  [
                    "Today is not just another day…",
                    "Some people become home.",
                    "You made this moment unforgettable.",
                  ][step]
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
