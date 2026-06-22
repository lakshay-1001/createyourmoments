import { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Gift, Share2, Volume2 } from "lucide-react";
export default function MomentView() {
  const [opened, setOpened] = useState(false);
  const [tab, setTab] = useState(0);
  function open() {
    setOpened(true);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
  }
  return (
    <main className="min-h-screen mesh mobile-safe">
      <section className="mx-auto max-w-md px-5 py-8 text-center sm:max-w-4xl">
        <p className="caps text-primary">Create Your Moments</p>
        {!opened ? (
          <div className="flex min-h-[82vh] flex-col items-center justify-center">
            <h1 className="serif text-5xl font-bold">
              A secret surprise is waiting
            </h1>
            <p className="mt-4 text-muted">
              Tap the envelope to unlock the memories.
            </p>
            <button
              onClick={open}
              className="mt-10 group relative h-44 w-64 rounded-3xl bg-primary shadow-glow"
            >
              <div className="absolute inset-x-5 top-8 h-24 rounded-2xl bg-cream transition group-hover:-translate-y-5" />
              <div className="absolute bottom-0 left-0 right-0 h-28 rounded-b-3xl bg-secondary" />
              <Gift
                className="absolute left-1/2 top-1/2 -translate-x-1/2 text-white"
                size={42}
              />
            </button>
          </div>
        ) : (
          <div className="py-10">
            <h1 className="serif text-5xl sm:text-7xl font-bold">
              Happy Birthday, Priya
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Today is not just another day. It is a collection of memories,
              smiles and wishes made only for you.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {["First Memory", "Why You Matter", "Final Surprise"].map(
                (s, i) => (
                  <button
                    key={s}
                    onClick={() => setTab(i)}
                    className={`rounded-3xl p-6 text-left shadow-ambient ${tab === i ? "bg-primary text-white" : "glass"}`}
                  >
                    <Heart size={22} />
                    <h3 className="serif mt-4 text-2xl font-bold">{s}</h3>
                    <p className="mt-2 text-sm opacity-80">Tap to reveal</p>
                  </button>
                ),
              )}
            </div>
            <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-glow">
              <p className="caps text-primary">Unlocked</p>
              <h2 className="serif mt-3 text-4xl font-bold">
                {
                  [
                    "The day we met",
                    "You make ordinary days special",
                    "You are loved more than words can say",
                  ][tab]
                }
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted">
                This is sample demo content. User photos, voice messages, music
                and timeline will appear here after builder and Supabase
                integration.
              </p>
              <button
                onClick={() => confetti({ particleCount: 160, spread: 100 })}
                className="btn-primary mt-7 px-8 py-4"
              >
                Celebrate Again
              </button>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <button className="btn-soft px-5 py-3 flex items-center gap-2">
                <Volume2 size={18} /> Music
              </button>
              <button className="btn-soft px-5 py-3 flex items-center gap-2">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
