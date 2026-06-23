import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { CalendarDays, Gift, Heart, MapPin, Music2, Sparkles, Star, Volume2 } from "lucide-react";
import { templates } from "../data/templates";

export type ExperienceMode = "embedded" | "full";

type RealTemplateExperienceProps = {
  slug?: string;
  mode?: ExperienceMode;
};

const memoryPhotos = [
  "linear-gradient(135deg,#fff7ed,#fbdbde)",
  "linear-gradient(135deg,#f7e7ce,#e7e7fb)",
  "linear-gradient(135deg,#fbdbde,#fef3c7)",
  "linear-gradient(135deg,#ede9fe,#fff7ed)",
];

function celebrate(type: "soft" | "big" = "soft") {
  confetti({
    particleCount: type === "big" ? 160 : 80,
    spread: type === "big" ? 110 : 70,
    origin: { y: 0.65 },
  });
}

export default function RealTemplateExperience({ slug = "birthday-treasure-box", mode = "full" }: RealTemplateExperienceProps) {
  const template = useMemo(() => templates.find((t) => t.slug === slug) || templates[1], [slug]);

  if (template.category === "Wedding") return <HinduWeddingExperience mode={mode} />;
  if (template.slug === "love-story-journey") return <LoveStoryExperience mode={mode} />;
  if (template.slug === "friendship-adventure") return <FriendshipExperience mode={mode} />;
  if (template.slug === "golden-anniversary") return <AnniversaryExperience mode={mode} />;
  if (template.slug === "family-letter") return <FamilyLetterExperience mode={mode} />;
  return <BirthdayTreasureExperience mode={mode} />;
}

function Shell({ children, mode, className = "" }: { children: React.ReactNode; mode: ExperienceMode; className?: string }) {
  return (
    <main className={`${mode === "full" ? "min-h-screen" : "min-h-[720px]"} mobile-safe overflow-hidden ${className}`}>
      {children}
    </main>
  );
}

function BirthdayTreasureExperience({ mode }: { mode: ExperienceMode }) {
  const [opened, setOpened] = useState(false);
  const [memory, setMemory] = useState(0);
  return (
    <Shell mode={mode} className="bg-[#fff8f1]">
      {!opened ? (
        <section className="flex min-h-[inherit] flex-col items-center justify-center px-5 py-16 text-center">
          <p className="caps text-primary">Birthday Treasure Box</p>
          <h1 className="serif mt-4 max-w-2xl text-5xl font-bold leading-tight sm:text-7xl">A little box full of memories</h1>
          <p className="mt-5 max-w-md text-muted">Tap the gift to open balloons, photos, voice notes and the final birthday surprise.</p>
          <button
            onClick={() => { setOpened(true); celebrate("big"); }}
            className="group relative mt-10 h-52 w-64 rounded-[2rem] bg-[#7c3aed] shadow-glow transition hover:-translate-y-2 sm:h-60 sm:w-80"
          >
            <span className="absolute -top-5 left-1/2 h-12 w-52 -translate-x-1/2 rounded-2xl bg-[#fbdbde] transition group-hover:-translate-y-5" />
            <span className="absolute inset-x-10 top-0 h-full bg-[#f59e0b]/30" />
            <Gift className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={54} />
            <span className="absolute bottom-6 left-0 right-0 text-sm font-bold text-white">Tap to open</span>
          </button>
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-5 py-10 text-center sm:py-16">
          <p className="caps text-primary">Unlocked for Anaya</p>
          <h1 className="serif mx-auto mt-3 max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">Happy Birthday, Sunshine ✨</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">Today is not just another day. It is a small festival of your laughter, kindness and all the memories that make you special.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            {["Open Memory", "Reveal Wish", "Play Voice", "Final Confetti"].map((item, i) => (
              <button key={item} onClick={() => { setMemory(i); if (i === 3) celebrate("big"); }} className={`rounded-3xl p-5 text-left shadow-ambient transition hover:-translate-y-1 ${memory === i ? "bg-[#7c3aed] text-white" : "glass"}`}>
                <Sparkles size={22} />
                <h3 className="serif mt-3 text-xl font-bold">{item}</h3>
                <p className="mt-1 text-xs opacity-75">Tap to unlock</p>
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 rounded-[2rem] bg-white p-5 shadow-glow sm:grid-cols-[1fr_1.2fr] sm:p-8">
            <div className="min-h-72 rounded-[1.5rem] p-6 text-left text-white shadow-ambient" style={{ background: memoryPhotos[memory] }}>
              <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                <p className="caps text-white/80">Memory {memory + 1}</p>
                <h2 className="serif mt-2 text-3xl font-bold">{["That unforgettable smile", "A wish only for you", "Voice note preview", "Birthday blast"][memory]}</h2>
              </div>
            </div>
            <div className="flex flex-col justify-center text-left">
              <p className="caps text-primary">Personal Message</p>
              <h2 className="serif mt-3 text-4xl font-bold">You make ordinary days feel magical.</h2>
              <p className="mt-4 text-muted">In the real template, the buyer adds photos, a written message, optional voice note and background music. The receiver unlocks everything step by step.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="btn-soft px-5 py-3"><Volume2 className="mr-2 inline" size={17} />Voice note</button>
                <button onClick={() => celebrate("big")} className="btn-primary px-6 py-3">Celebrate</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Shell>
  );
}

function LoveStoryExperience({ mode }: { mode: ExperienceMode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [step, setStep] = useState(0);
  return (
    <Shell mode={mode} className="bg-[#0f172a] text-white">
      {!unlocked ? (
        <section className="flex min-h-[inherit] flex-col items-center justify-center px-5 text-center">
          <p className="caps text-[#fbdbde]">Private Love Story</p>
          <h1 className="serif mt-4 text-5xl font-bold sm:text-7xl">Only for Priya ❤️</h1>
          <p className="mt-5 max-w-md text-white/65">Unlock the heart to begin a cinematic journey through memories.</p>
          <button onClick={() => { setUnlocked(true); celebrate(); }} className="mt-10 flex h-44 w-44 items-center justify-center rounded-full bg-[#fbdbde] text-[#70585b] shadow-[0_0_80px_rgba(251,219,222,.35)] transition hover:scale-105">
            <Heart size={70} fill="currentColor" />
          </button>
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-5 py-12">
          <div className="text-center">
            <p className="caps text-[#fbdbde]">The Story of Us</p>
            <h1 className="serif mt-3 text-5xl font-bold sm:text-7xl">Every chapter led me to you.</h1>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-4">
            {["How we met", "First date", "Favorite memory", "Secret reveal"].map((x, i) => <button key={x} onClick={() => setStep(i)} className={`rounded-3xl p-5 text-left ${step === i ? "bg-[#fbdbde] text-[#281719]" : "bg-white/10 text-white"}`}><Star size={18}/><b className="mt-3 block">{x}</b></button>)}
          </div>
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
            <p className="caps text-[#fbdbde]">Chapter {step + 1}</p>
            <h2 className="serif mt-3 text-4xl font-bold">{["The first hello", "The moment everything changed", "The memory I replay", "A secret only you should know"][step]}</h2>
            <p className="mt-4 max-w-2xl text-white/70">This template uses unlock screens, flip cards, timeline memories and a final emotional reveal to feel far more valuable than a normal card.</p>
            <button onClick={() => celebrate("big")} className="mt-7 rounded-full bg-white px-7 py-3 font-bold text-[#0f172a]">Reveal Surprise</button>
          </div>
        </section>
      )}
    </Shell>
  );
}

function HinduWeddingExperience({ mode }: { mode: ExperienceMode }) {
  const [opened, setOpened] = useState(false);
  const [section, setSection] = useState(0);
  const items = ["Ganesh Blessing", "Bride & Groom", "Wedding Events", "Venue Location", "Guest Wishes"];
  return (
    <Shell mode={mode} className="bg-[#fff8ec] text-[#2b2118]">
      {!opened ? (
        <section className="relative flex min-h-[inherit] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
          <div className="absolute -top-20 h-72 w-72 rounded-full bg-[#f59e0b]/20 blur-3xl" />
          <p className="caps text-[#9a3412]">Shubh Vivah Invitation</p>
          <div className="mt-5 rounded-full border border-[#d4a373]/40 bg-white/70 px-5 py-2 text-sm font-semibold">॥ श्री गणेशाय नमः ॥</div>
          <h1 className="serif mt-5 max-w-3xl text-5xl font-bold leading-tight sm:text-7xl">A Royal Hindu Wedding Card</h1>
          <p className="mt-5 max-w-xl text-[#6b5b4b]">An interactive wedding invitation with cultural warmth, event details, couple story, location, pictures and guest wishes.</p>
          <button onClick={() => { setOpened(true); celebrate("big"); }} className="group relative mt-10 h-56 w-72 rounded-[2rem] border border-[#d4a373]/50 bg-gradient-to-br from-[#8a3ffc] via-[#c2410c] to-[#f59e0b] p-4 shadow-glow transition hover:-translate-y-2 sm:w-96">
            <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/40 bg-[#fff8ec]/90">
              <div>
                <p className="text-5xl">🪷</p>
                <p className="serif mt-3 text-3xl font-bold text-[#8a3ffc]">Open Invitation</p>
                <p className="mt-2 text-sm text-[#9a3412]">Tap to enter celebration</p>
              </div>
            </div>
          </button>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="text-center">
            <p className="caps text-[#9a3412]">॥ श्री गणेशाय नमः ॥</p>
            <h1 className="serif mt-3 text-5xl font-bold leading-tight sm:text-7xl">Aarav & Meera</h1>
            <p className="mt-4 text-[#6b5b4b]">Together with their families invite you to celebrate their sacred union.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {items.map((x, i) => <button key={x} onClick={() => setSection(i)} className={`rounded-2xl p-4 text-sm font-bold transition ${section === i ? "bg-[#8a3ffc] text-white shadow-glow" : "bg-white/80 text-[#6b5b4b]"}`}>{x}</button>)}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-glow sm:p-10">
              <p className="caps text-[#9a3412]">{items[section]}</p>
              <h2 className="serif mt-3 text-4xl font-bold">{[
                "Begin with blessings",
                "Two families, one beautiful journey",
                "Haldi, Mehendi, Sangeet & Wedding",
                "Reach the venue with one tap",
                "Leave your blessings for the couple",
              ][section]}</h2>
              <p className="mt-4 text-[#6b5b4b]">{[
                "The experience opens respectfully with Ganesh blessing and a warm invitation feel suitable for Hindu weddings.",
                "Add couple photos, parent names, family message and a short love story before guests see event details.",
                "Show multiple event cards with dates, timings, dress code and beautiful reveal animations.",
                "Add venue name, address, Google Maps button and travel notes for guests.",
                "Guests can view the card, send wishes and share the link on WhatsApp.",
              ][section]}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#fff8ec] px-4 py-2 text-sm font-bold text-[#9a3412]"><CalendarDays className="mr-1 inline" size={16}/> 90 days active</span>
                <span className="rounded-full bg-[#fff8ec] px-4 py-2 text-sm font-bold text-[#9a3412]"><MapPin className="mr-1 inline" size={16}/> Location included</span>
                <span className="rounded-full bg-[#fff8ec] px-4 py-2 text-sm font-bold text-[#9a3412]"><Music2 className="mr-1 inline" size={16}/> Music ready</span>
              </div>
            </div>
            <div className="grid gap-4">
              {["Haldi", "Mehendi", "Wedding", "Reception"].map((event, i) => (
                <div key={event} className="rounded-3xl border border-[#d4a373]/30 bg-white/80 p-5 shadow-ambient">
                  <p className="caps text-[#9a3412]">Event {i + 1}</p>
                  <h3 className="serif mt-1 text-2xl font-bold">{event}</h3>
                  <p className="mt-1 text-sm text-[#6b5b4b]">Tap card in live page to reveal timing, venue and notes.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Shell>
  );
}

function FriendshipExperience({ mode }: { mode: ExperienceMode }) {
  const [clue, setClue] = useState(0);
  return <Shell mode={mode} className="bg-[#f8f7ff]"><section className="mx-auto max-w-4xl px-5 py-14 text-center"><p className="caps text-primary">Friendship Adventure</p><h1 className="serif mt-3 text-5xl font-bold sm:text-7xl">Guess who made this?</h1><p className="mx-auto mt-4 max-w-xl text-muted">Reveal clues, unlock funny memories and finish with a best-friend award.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{["Clue 1", "Memory Quiz", "Final Award"].map((x,i)=><button key={x} onClick={()=>{setClue(i); if(i===2) celebrate("big")}} className={`rounded-3xl p-7 text-left ${clue===i?"bg-primary text-white":"glass"}`}><Sparkles/><h3 className="serif mt-3 text-2xl font-bold">{x}</h3><p className="mt-2 text-sm opacity-75">Tap to reveal</p></button>)}</div><div className="mt-8 rounded-[2rem] bg-white p-8 shadow-glow"><h2 className="serif text-4xl font-bold">{["We laugh at the same nonsense", "You remember the most embarrassing stories", "Certified best friend forever"][clue]}</h2><p className="mx-auto mt-3 max-w-2xl text-muted">Perfect for college friends, best friends and groups.</p></div></section></Shell>;
}

function AnniversaryExperience({ mode }: { mode: ExperienceMode }) {
  const [year, setYear] = useState(0);
  return <Shell mode={mode} className="bg-[#fbf3e6]"><section className="mx-auto max-w-5xl px-5 py-14 text-center"><p className="caps text-primary">Anniversary Time Machine</p><h1 className="serif mt-3 text-5xl font-bold sm:text-7xl">Travel through our years</h1><div className="mt-10 flex flex-wrap justify-center gap-3">{["Year 1","First Trip","Best Memory","Future Promise"].map((x,i)=><button key={x} onClick={()=>setYear(i)} className={`rounded-full px-5 py-3 font-bold ${year===i?"bg-primary text-white":"bg-white"}`}>{x}</button>)}</div><div className="mt-8 rounded-[2rem] bg-white p-8 shadow-glow"><p className="caps text-primary">Unlocked</p><h2 className="serif mt-3 text-4xl font-bold">{["Where it all began","The trip we still talk about","A memory that feels like home","More memories are waiting"][year]}</h2><p className="mx-auto mt-4 max-w-2xl text-muted">Warm timeline, promises, photos and music designed for couples.</p></div></section></Shell>;
}

function FamilyLetterExperience({ mode }: { mode: ExperienceMode }) {
  const [open, setOpen] = useState(false);
  return <Shell mode={mode} className="bg-[#fcf9f8]"><section className="mx-auto flex min-h-[inherit] max-w-4xl flex-col items-center justify-center px-5 py-14 text-center"><p className="caps text-primary">Family Letter</p><h1 className="serif mt-3 text-5xl font-bold sm:text-7xl">A thank-you note brought to life</h1>{!open?<button onClick={()=>setOpen(true)} className="btn-primary mt-9 px-8 py-4">Open Letter</button>:<div className="mt-8 rounded-[2rem] bg-white p-8 text-left shadow-glow"><h2 className="serif text-4xl font-bold">Dear Mom, thank you for everything.</h2><p className="mt-4 text-muted">This emotional template supports voice note, reasons cards, family pictures and a final thank-you screen.</p><button onClick={()=>celebrate()} className="btn-soft mt-6 px-5 py-3">Reveal reasons</button></div>}</section></Shell>;
}
