
import { useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  CalendarDays,
  ChevronRight,
  Gift,
  Heart,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Music2,
  Sparkles,
  Star,
} from "lucide-react";
import { templates } from "../data/templates";

export type ExperienceMode = "embedded" | "full";

type Props = {
  slug?: string;
  mode?: ExperienceMode;
  receiverName?: string;
  momentCode?: string;
  draft?: Record<string, any> | null;
};

const img = {
  weddingHero: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85",
  weddingDecor: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=900&q=85",
  weddingCouple: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85",
  birthday: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=85",
  cake: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85",
  love: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=85",
  rose: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1000&q=85",
  friends: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
  anniversary: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85",
};

function fire(big = false) {
  confetti({ particleCount: big ? 160 : 70, spread: big ? 120 : 75, origin: { y: 0.72 } });
}

function scroll(ref: React.RefObject<HTMLElement | null>) {
  setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
}

function displayName(name?: string) {
  return name?.trim().replace(/[-_]+/g, " ");
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PhoneShell({ children, mode }: { children: React.ReactNode; mode: ExperienceMode }) {
  if (mode === "full") return <>{children}</>;
  return (
    <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-[2rem] bg-white shadow-glow">
      {children}
    </div>
  );
}

export default function RealTemplateExperience({
  slug = "birthday-treasure-box",
  mode = "full",
  receiverName,
  momentCode,
  draft,
}: Props) {
  const template = useMemo(() => templates.find((t) => t.slug === slug) || templates[1], [slug]);
  const receiver = displayName(receiverName || draft?.receiver_name || draft?.receiverName);

  if (template.category === "Wedding" || template.slug.includes("wedding")) {
    return <WeddingExperience mode={mode} receiverName={receiver} momentCode={momentCode} draft={draft} />;
  }
  if (template.category === "Valentine") {
    return <ValentineExperience mode={mode} receiverName={receiver} />;
  }
  if (template.category === "Love Story") {
    return <LoveExperience mode={mode} receiverName={receiver} />;
  }
  if (template.category === "Birthday") {
    return <BirthdayExperience mode={mode} receiverName={receiver} />;
  }
  return <GenericExperience mode={mode} receiverName={receiver} templateSlug={template.slug} />;
}

function WeddingExperience({ mode, receiverName, momentCode, draft }: Props) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<"story" | "events" | "venue" | "blessings">("story");
  const body = useRef<HTMLElement | null>(null);

  const couple = draft?.moment_title || draft?.momentTitle || "Riya & Rahul";
  const date = draft?.event_date || draft?.eventDate || "18 February 2027";
  const venue = draft?.venue || "Royal Palace, Jaipur";
  const occasion = draft?.occasion || "Wedding Celebration";
  const welcomeName = receiverName || "Family & Friends";

  function openEnvelope() {
    setOpened(true);
    fire(true);
    scroll(body);
  }

  function choose(tab: typeof active) {
    setActive(tab);
    scroll(body);
  }

  const events = occasion.toLowerCase().includes("engagement")
    ? [
        ["04:00 PM", "Ring Ceremony", "Exchange of rings with family blessings."],
        ["05:00 PM", "Couple Photos", "A beautiful moment with guests and family."],
        ["07:00 PM", "Dinner", "Celebrate together with food, music and smiles."],
      ]
    : [
        ["10:00 AM", "Ganesh Vandana", "Blessings before the ceremony begins."],
        ["04:00 PM", "Mehendi", "Music, laughter and beautiful hands."],
        ["07:00 PM", "Sangeet", "Dance night with family and friends."],
        ["09:00 PM", "Wedding Ceremony", "Saat phere and blessings."],
      ];

  return (
    <PhoneShell mode={mode}>
      <main className={cx("min-h-screen bg-[#fff7ed] text-[#2a1512]", mode === "embedded" && "min-h-[720px]")}>
        <section className="relative grid min-h-[92vh] place-items-center overflow-hidden px-5 py-10 text-center">
          <img src={img.weddingHero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed]/95 via-[#fff7ed]/70 to-[#7c2d12]/80" />
          <div className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/60 bg-white/78 p-6 shadow-glow backdrop-blur">
            <p className="caps text-[#7c2d12]">शुभ मंगल • {occasion}</p>
            <div className="mx-auto mt-5 grid h-24 w-32 place-items-center rounded-3xl bg-gradient-to-br from-[#7c2d12] to-[#f59e0b] text-4xl text-white shadow-glow">
              🪔
            </div>
            <h1 className="serif mt-6 text-4xl font-bold leading-tight">{couple}</h1>
            <p className="mt-3 text-sm leading-6 text-[#5f352e]">
              Dear {welcomeName}, your presence means the world to us.
            </p>
            <button onClick={openEnvelope} className="btn-primary mt-6 w-full py-4">
              Open Royal Invitation
            </button>
            <p className="mt-3 text-xs text-[#7c2d12]/75">No app install. No login for guests. Just open and bless.</p>
          </div>
        </section>

        {opened && (
          <section ref={body} className="px-4 py-8">
            <div className="mx-auto max-w-md">
              <div className="rounded-[2rem] bg-white p-5 shadow-ambient">
                <p className="caps text-[#7c2d12]">Welcome {welcomeName}</p>
                <h2 className="serif mt-3 text-3xl font-bold">You are invited with love.</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f352e]">
                  Join us for {couple}'s {occasion.toLowerCase()} on <b>{date}</b>. This digital invitation is personalized for you.
                </p>
              </div>

              <div className="sticky top-16 z-20 mt-5 grid grid-cols-2 gap-3 rounded-[1.5rem] bg-[#fff7ed]/90 p-2 backdrop-blur sm:grid-cols-4">
                {[
                  ["story", "Our Story"],
                  ["events", "Events"],
                  ["venue", "Venue"],
                  ["blessings", "Blessings"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => choose(key as any)}
                    className={cx(
                      "rounded-2xl px-3 py-3 text-xs font-bold transition",
                      active === key ? "bg-[#7c2d12] text-white shadow-ambient" : "bg-white text-[#5f352e]"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[2rem] bg-white p-5 shadow-ambient">
                {active === "story" && (
                  <div className="grid gap-4">
                    <img src={img.weddingDecor} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
                    <p className="caps text-[#7c2d12]">Their Story</p>
                    <h3 className="serif text-3xl font-bold">From first hello to forever.</h3>
                    <p className="leading-7 text-[#5f352e]">
                      This template works even when the couple does not have a professional shoot yet. Use a simple portrait, family picture, invitation image or decorative photo.
                    </p>
                    <button onClick={() => choose("events")} className="btn-primary py-3">See Ceremony Flow</button>
                  </div>
                )}

                {active === "events" && (
                  <div>
                    <p className="caps text-[#7c2d12]">Ceremony Flow</p>
                    <h3 className="serif mt-2 text-3xl font-bold">Every event beautifully arranged.</h3>
                    <div className="mt-5 grid gap-3">
                      {events.map((e) => (
                        <div key={e[1]} className="rounded-3xl bg-[#fff7ed] p-4">
                          <p className="text-xs font-bold tracking-[0.18em] text-[#7c2d12]">{e[0]}</p>
                          <h4 className="serif mt-1 text-2xl font-bold">{e[1]}</h4>
                          <p className="mt-1 text-sm leading-6 text-[#5f352e]">{e[2]}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => choose("venue")} className="btn-primary mt-5 w-full py-3">Open Venue</button>
                  </div>
                )}

                {active === "venue" && (
                  <div>
                    <MapPin className="text-[#7c2d12]" />
                    <h3 className="serif mt-3 text-3xl font-bold">{venue}</h3>
                    <p className="mt-3 leading-7 text-[#5f352e]">Guests can open directions directly from the invitation. This removes confusion and makes the card useful, not just beautiful.</p>
                    <div className="mt-5 rounded-[1.5rem] bg-[#7c2d12] p-5 text-white">
                      <p className="caps text-white/70">Map placeholder</p>
                      <p className="mt-3 text-sm">Google Maps link will be connected from the customer form.</p>
                    </div>
                    <button onClick={() => choose("blessings")} className="btn-primary mt-5 w-full py-3">Send Blessings</button>
                  </div>
                )}

                {active === "blessings" && (
                  <div>
                    <p className="caps text-[#7c2d12]">Bless the Couple</p>
                    <h3 className="serif mt-2 text-3xl font-bold">Leave your wishes.</h3>
                    <textarea className="field mt-5 min-h-28" placeholder="Write your blessing..." />
                    <button onClick={() => fire(true)} className="btn-primary mt-4 w-full py-3">Send Blessing ✨</button>
                    <p className="mt-4 text-center text-xs text-[#5f352e]">Moment Code: {momentCode || "demo"}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </PhoneShell>
  );
}

function BirthdayExperience({ mode, receiverName }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const contentRef = useRef<HTMLElement | null>(null);
  const name = receiverName || "Best Friend";
  const memories = ["Your smile lights up every room.", "Another year, another beautiful chapter.", "May this year bring magic, love and wins."];

  function start() {
    setOpen(true);
    fire(true);
    scroll(contentRef);
  }

  return (
    <PhoneShell mode={mode}>
      <main className={cx("min-h-screen bg-gradient-to-b from-pink-50 to-orange-50", mode === "embedded" && "min-h-[720px]")}>
        <section className="grid min-h-[88vh] place-items-center px-5 text-center">
          <div className="max-w-sm rounded-[2rem] bg-white p-6 shadow-glow">
            <p className="caps text-pink-700">Birthday Treasure Box</p>
            <button onClick={start} className="mx-auto mt-8 grid h-40 w-44 place-items-center rounded-[2rem] bg-gradient-to-br from-pink-500 to-orange-400 text-6xl shadow-glow">🎁</button>
            <h1 className="serif mt-7 text-4xl font-bold">A surprise for {name}</h1>
            <p className="mt-3 text-muted">Tap the gift. The page guides the receiver automatically.</p>
          </div>
        </section>
        {open && (
          <section ref={contentRef} className="px-4 py-8">
            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-5 shadow-ambient">
              <img src={step === 0 ? img.birthday : img.cake} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
              <h2 className="serif mt-5 text-3xl font-bold">Happy Birthday, {name} 🎂</h2>
              <p className="mt-3 leading-7 text-muted">{memories[step]}</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {memories.map((_, i) => (
                  <button key={i} onClick={() => setStep(i)} className={cx("rounded-2xl py-3 font-bold", step === i ? "bg-pink-500 text-white" : "bg-pink-50 text-pink-800")}>#{i + 1}</button>
                ))}
              </div>
              <button onClick={() => fire(true)} className="btn-primary mt-5 w-full py-3">Final Confetti</button>
            </div>
          </section>
        )}
      </main>
    </PhoneShell>
  );
}

function LoveExperience({ mode, receiverName }: Props) {
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const name = receiverName || "You";
  const cards = ["The day I met you changed everything.", "Every ordinary moment feels special with you.", "This is my little digital surprise for your heart."];

  function unlock() {
    setOpen(true);
    fire();
    scroll(ref);
  }

  return (
    <PhoneShell mode={mode}>
      <main className={cx("min-h-screen bg-[#111827] text-white", mode === "embedded" && "min-h-[720px]")}>
        <section className="grid min-h-[88vh] place-items-center px-5 text-center">
          <div className="max-w-sm rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-glow backdrop-blur">
            <LockKeyhole className="mx-auto text-pink-300" size={56} />
            <p className="caps mt-6 text-pink-200">Only for {name}</p>
            <h1 className="serif mt-4 text-4xl font-bold">Unlock my heart</h1>
            <button onClick={unlock} className="mt-8 rounded-full bg-pink-400 px-8 py-4 font-bold text-[#111827]">Unlock ❤️</button>
          </div>
        </section>
        {open && (
          <section ref={ref} className="px-4 py-8">
            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-5 text-[#111827] shadow-glow">
              <img src={img.love} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
              <p className="caps mt-5 text-pink-700">Chapter {card + 1}</p>
              <h2 className="serif mt-2 text-3xl font-bold">{cards[card]}</h2>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {cards.map((_, i) => (
                  <button key={i} onClick={() => setCard(i)} className={cx("rounded-2xl py-3 font-bold", card === i ? "bg-pink-400" : "bg-pink-50")}>{i + 1}</button>
                ))}
              </div>
              <button onClick={() => fire(true)} className="btn-primary mt-5 w-full py-3">Reveal Final Surprise</button>
            </div>
          </section>
        )}
      </main>
    </PhoneShell>
  );
}

function ValentineExperience({ mode, receiverName }: Props) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const name = receiverName || "My Valentine";
  const days = ["Rose", "Propose", "Chocolate", "Teddy", "Promise", "Hug", "Kiss", "Valentine"];

  function pick(i: number) {
    setActive(i);
    fire();
    scroll(ref);
  }

  return (
    <PhoneShell mode={mode}>
      <main className={cx("min-h-screen bg-rose-50", mode === "embedded" && "min-h-[720px]")}>
        <section className="px-4 py-8 text-center">
          <div className="rounded-[2rem] bg-white p-5 shadow-glow">
            <p className="caps text-rose-700">Valentine Week</p>
            <h1 className="serif mt-3 text-4xl font-bold">8 days. 8 little surprises.</h1>
            <p className="mt-3 text-muted">For {name}. Tap a day to reveal a mini love note.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {days.map((d, i) => (
                <button key={d} onClick={() => pick(i)} className={cx("rounded-3xl p-4 text-left shadow-ambient", active === i ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-900")}>
                  <Heart size={18} />
                  <b className="mt-2 block">{d} Day</b>
                  <span className="text-xs opacity-80">Tap to unlock</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section ref={ref} className="px-4 pb-8">
          <div className="mx-auto max-w-md rounded-[2rem] bg-white p-5 shadow-ambient">
            <img src={img.rose} alt="" className="h-52 w-full rounded-[1.5rem] object-cover" />
            <h2 className="serif mt-5 text-3xl font-bold">{days[active]} Day for {name}</h2>
            <p className="mt-3 leading-7 text-muted">A small moment, a sweet message and a beautiful reason to smile today.</p>
          </div>
        </section>
      </main>
    </PhoneShell>
  );
}

function GenericExperience({ mode, receiverName, templateSlug }: { mode: ExperienceMode; receiverName?: string; templateSlug: string }) {
  const [open, setOpen] = useState(false);
  const template = templates.find((t) => t.slug === templateSlug) || templates[4];
  const photo = template.category === "Friendship" ? img.friends : template.category === "Family" ? img.family : img.anniversary;
  return (
    <PhoneShell mode={mode}>
      <main className={cx("min-h-screen bg-cream", mode === "embedded" && "min-h-[720px]")}>
        <section className="grid min-h-[88vh] place-items-center px-5">
          <div className="rounded-[2rem] bg-white p-6 text-center shadow-glow">
            <Sparkles className="mx-auto text-primary" size={48} />
            <p className="caps mt-5 text-primary">{template.category}</p>
            <h1 className="serif mt-3 text-4xl font-bold">{template.title}</h1>
            <p className="mt-3 text-muted">Made for {receiverName || "someone special"}.</p>
            <button onClick={() => { setOpen(true); fire(); }} className="btn-primary mt-6 w-full py-4">Open Experience</button>
          </div>
        </section>
        {open && (
          <section className="px-4 pb-8">
            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-5 shadow-ambient">
              <img src={photo} alt="" className="h-56 w-full rounded-[1.5rem] object-cover" />
              <h2 className="serif mt-5 text-3xl font-bold">A memory worth sharing</h2>
              <p className="mt-3 leading-7 text-muted">{template.description}</p>
              <button onClick={() => fire(true)} className="btn-primary mt-5 w-full py-3">Celebrate</button>
            </div>
          </section>
        )}
      </main>
    </PhoneShell>
  );
}
