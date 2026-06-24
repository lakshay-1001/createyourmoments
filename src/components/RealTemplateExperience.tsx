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
  Volume2,
} from "lucide-react";
import { templates } from "../data/templates";

export type ExperienceMode = "embedded" | "full";

type RealTemplateExperienceProps = {
  slug?: string;
  mode?: ExperienceMode;
  receiverName?: string;
  momentCode?: string;
};

const photos = {
  weddingHero:
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85",
  weddingCouple:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85",
  weddingMandap:
    "https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1000&q=85",
  weddingMehendi:
    "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=1000&q=85",
  birthday:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85",
  cake:
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=85",
  friends:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85",
  love:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85",
  couple:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  anniversary:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=85",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85",
};

function celebrate(type: "soft" | "big" = "soft") {
  confetti({
    particleCount: type === "big" ? 180 : 80,
    spread: type === "big" ? 120 : 75,
    origin: { y: 0.68 },
  });
}

function cleanName(name?: string) {
  return name?.trim().replace(/[-_]+/g, " ");
}


function scrollToRef(ref: React.RefObject<any>) {
  setTimeout(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

function ContinueCue({ label = "Tap to continue" }: { label?: string }) {
  return (
    <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-ambient">
      {label}
      <ChevronRight size={14} />
    </span>
  );
}

export default function RealTemplateExperience({
  slug = "birthday-treasure-box",
  mode = "full",
  receiverName,
  momentCode,
}: RealTemplateExperienceProps) {
  const template = useMemo(() => templates.find((t) => t.slug === slug) || templates[1], [slug]);
  const receiver = cleanName(receiverName);

  if (template.category === "Wedding") return <HinduWeddingExperience mode={mode} receiverName={receiver} momentCode={momentCode} />;
  if (template.slug === "love-story-journey") return <LoveStoryExperience mode={mode} receiverName={receiver} />;
  if (template.slug === "friendship-adventure") return <FriendshipExperience mode={mode} receiverName={receiver} />;
  if (template.slug === "golden-anniversary") return <AnniversaryExperience mode={mode} receiverName={receiver} />;
  if (template.slug === "family-letter") return <FamilyLetterExperience mode={mode} receiverName={receiver} />;
  return <BirthdayTreasureExperience mode={mode} receiverName={receiver} />;
}

function Shell({ children, mode, className = "" }: { children: React.ReactNode; mode: ExperienceMode; className?: string }) {
  return (
    <main className={`${mode === "full" ? "min-h-screen" : "min-h-[680px] sm:min-h-[760px]"} mobile-safe overflow-hidden ${className}`}>
      {children}
    </main>
  );
}

function RecipientRibbon({ receiverName, light = false }: { receiverName?: string; light?: boolean }) {
  if (!receiverName) return null;
  return (
    <div className={`mx-auto mb-5 w-max rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] shadow-ambient backdrop-blur ${light ? "bg-white/20 text-white" : "bg-white/80 text-primary"}`}>
      Personally invited for {receiverName}
    </div>
  );
}

function PictureCard({ src, title, subtitle, className = "" }: { src: string; title: string; subtitle: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.5rem] shadow-ambient ${className}`}>
      <img src={src} alt={title} className="h-full min-h-52 sm:min-h-60 w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="caps opacity-80">{subtitle}</p>
        <h3 className="serif mt-1 text-2xl font-bold">{title}</h3>
      </div>
    </div>
  );
}

function HinduWeddingExperience({ mode, receiverName, momentCode }: { mode: ExperienceMode; receiverName?: string; momentCode?: string }) {
  const [opened, setOpened] = useState(false);
  const [section, setSection] = useState(0);
  const [wish, setWish] = useState("");
  const contentRef = useRef<any>(null);

  if (!opened) {
    return (
      <Shell mode={mode} className="bg-[#220d0d] text-white">
        <section className="relative flex min-h-[inherit] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
          <img src={photos.weddingHero} alt="Indian wedding" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#220d0d]/90 via-[#4b1f1f]/70 to-[#120707]" />
          <div className="relative z-10 max-w-2xl">
            <RecipientRibbon receiverName={receiverName} light />
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f6d365]/20 text-2xl shadow-glow sm:h-16 sm:w-16 sm:text-3xl">ॐ</div>
            <p className="caps text-[#f6d365]">Shubh Vivah Digital Invitation</p>
            <h1 className="serif mt-4 text-4xl font-bold leading-tight sm:text-7xl">Riya weds Rahul</h1>
            <p className="mt-5 text-white/80">A royal Hindu wedding experience with Ganesh vandana, family invitation, event timeline, venue, RSVP and blessings.</p>
            {momentCode && <p className="mt-3 text-xs text-white/50">Invitation ID: {momentCode}</p>}
            <button
              onClick={() => {
                setOpened(true);
                celebrate("big");
                scrollToRef(contentRef);
              }}
              className="group relative mx-auto mt-8 block h-44 w-64 rounded-[2rem] border border-[#f6d365]/50 bg-gradient-to-br from-[#7b2d26] to-[#3b1212] shadow-glow transition active:scale-95 hover:-translate-y-2 sm:h-56 sm:w-96"
            >
              <span className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full border border-[#f6d365]/70 bg-[#f6d365]/10 text-4xl leading-[5rem] transition group-hover:scale-110 sm:top-8 sm:h-24 sm:w-24 sm:text-5xl sm:leading-[6rem]">श्री</span>
              <span className="absolute inset-x-8 bottom-8 rounded-full bg-[#f6d365] px-5 py-3 text-sm font-bold uppercase tracking-widest text-[#3b1212]">Open Royal Envelope</span>
            </button>
            <div className="sm:hidden"><ContinueCue label="Open & scroll" /></div>
          </div>
        </section>
      </Shell>
    );
  }

  const events = [
    ["Ganesh Vandana", "Blessings before the celebration begins", "10:00 AM", "bg-[#fff7ed]"],
    ["Mehendi", "Music, laughter and beautiful hands", "04:00 PM", "bg-[#fef3c7]"],
    ["Sangeet", "Dance night with family and friends", "07:00 PM", "bg-[#fde2e4]"],
    ["Wedding Ceremony", "Saat phere and lifetime promises", "09:00 PM", "bg-[#f7e7ce]"],
  ];

  return (
    <Shell mode={mode} className="bg-[#fff8f0]">
      <section className="relative overflow-hidden">
        <img src={photos.weddingHero} alt="Wedding ceremony" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b1212]/80 via-[#3b1212]/35 to-[#fff8f0]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 text-center text-white sm:px-5 sm:pb-20 sm:pt-28">
          <RecipientRibbon receiverName={receiverName} light />
          <p className="caps text-[#f6d365]">With blessings of Lord Ganesha</p>
          <h1 className="serif mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-8xl">Riya & Rahul</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/85">request your gracious presence as they begin their forever.</p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-2 sm:mt-8 sm:grid-cols-3">
            <InfoPill icon={<CalendarDays size={18} />} label="18 Feb 2027" />
            <InfoPill icon={<MapPin size={18} />} label="Royal Palace, Jaipur" />
            <InfoPill icon={<Sparkles size={18} />} label="90 Days Active" />
          </div>
        </div>
      </section>

      <section ref={contentRef} className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-16">
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
          {["Our Story", "Events", "Venue", "Blessings"].map((item, i) => (
            <button
              key={item}
              onClick={() => {
                setSection(i);
                if (i === 3) celebrate("soft");
                scrollToRef(contentRef);
              }}
              className={`min-w-[150px] rounded-3xl p-4 text-left transition active:scale-95 hover:-translate-y-1 sm:min-w-0 sm:p-5 ${section === i ? "bg-[#6f2a24] text-white shadow-glow" : "glass"}`}
            >
              <Star size={20} />
              <h3 className="serif mt-3 text-xl font-bold">{item}</h3>
              <p className="mt-1 text-xs opacity-75">Tap to reveal</p>
            </button>
          ))}
        </div>

        {section === 0 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-ambient sm:p-8">
              <p className="caps text-primary">Their story</p>
              <h2 className="serif mt-3 text-4xl font-bold">From first hello to forever.</h2>
              <p className="mt-4 leading-8 text-muted">A premium wedding card should feel like entering the family's celebration, not just reading a PDF. This section can show couple photos, story, parents names and a warm personal note for each guest.</p>
              {receiverName && <p className="mt-5 rounded-2xl bg-[#fff4db] p-4 font-semibold text-primary">Dear {receiverName}, your presence and blessings will make this celebration complete.</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <PictureCard src={photos.weddingCouple} title="The Couple" subtitle="Bride & Groom" />
              <PictureCard src={photos.weddingMandap} title="The Mandap" subtitle="Sacred Ceremony" className="sm:mt-10" />
            </div>
          </div>
        )}

        {section === 1 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {events.map(([title, desc, time, color]) => (
              <div key={title} className={`${color} rounded-[2rem] p-6 shadow-ambient`}>
                <p className="caps text-primary">{time}</p>
                <h3 className="serif mt-4 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
        )}

        {section === 2 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <PictureCard src={photos.weddingMehendi} title="Royal Palace, Jaipur" subtitle="Venue Location" />
            <div className="rounded-[2rem] bg-white p-6 shadow-ambient sm:p-8">
              <MapPin className="text-primary" size={34} />
              <h2 className="serif mt-4 text-4xl font-bold">Open location without confusion.</h2>
              <p className="mt-4 text-muted">In the real purchased card this opens Google Maps, parking note, nearby hotel suggestions and ceremony timings.</p>
              <button className="btn-primary mt-6 px-7 py-4">Open Maps Preview</button>
            </div>
          </div>
        )}

        {section === 3 && (
          <div className="mt-8 rounded-[2rem] bg-white p-6 text-center shadow-ambient sm:p-10">
            <p className="caps text-primary">Bless the couple</p>
            <h2 className="serif mx-auto mt-3 max-w-2xl text-4xl font-bold">Leave your blessings before you arrive.</h2>
            <textarea value={wish} onChange={(e) => setWish(e.target.value)} className="field mx-auto mt-6 max-w-2xl" placeholder="Write your blessing..." />
            <button onClick={() => celebrate("big")} className="btn-primary mt-5 px-8 py-4">Send Blessing</button>
            {wish && <p className="mx-auto mt-5 max-w-xl rounded-2xl bg-[#fff4db] p-4 text-muted">Preview: "{wish}"</p>}
          </div>
        )}
      </section>
    </Shell>
  );
}

function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-full bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">
      <span className="mr-2 inline-flex translate-y-1">{icon}</span>
      {label}
    </div>
  );
}

function BirthdayTreasureExperience({ mode, receiverName }: { mode: ExperienceMode; receiverName?: string }) {
  const [opened, setOpened] = useState(false);
  const [memory, setMemory] = useState(0);
  const contentRef = useRef<any>(null);
  const items = [
    ["First surprise", "A photo memory with music"],
    ["Hidden wish", "Tap to reveal a personal line"],
    ["Voice note", "A message that feels real"],
    ["Confetti finale", "The birthday blast"],
  ];

  return (
    <Shell mode={mode} className="bg-[#fff8f1]">
      {!opened ? (
        <section className="relative flex min-h-[inherit] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
          <img src={photos.birthday} alt="Birthday balloons" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="relative z-10">
            <RecipientRibbon receiverName={receiverName} />
            <p className="caps text-primary">Birthday Treasure Box</p>
            <h1 className="serif mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-7xl">A gift that opens into memories</h1>
            <p className="mx-auto mt-5 max-w-md text-muted">Tap the box. Every click reveals photos, wishes, voice notes and a surprise ending.</p>
            <button onClick={() => { setOpened(true); celebrate("big"); scrollToRef(contentRef); }} className="group relative mt-8 h-44 w-64 rounded-[2rem] bg-[#7c3aed] shadow-glow transition active:scale-95 hover:-translate-y-2 sm:h-56 sm:w-80">
              <span className="absolute -top-5 left-1/2 h-14 w-56 -translate-x-1/2 rounded-2xl bg-[#fbdbde] transition group-hover:-translate-y-6" />
              <span className="absolute inset-x-10 top-0 h-full bg-[#f59e0b]/35" />
              <Gift className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={48} />
              <span className="absolute bottom-6 left-0 right-0 text-sm font-bold text-white">Tap to open</span>
            </button>
            <div className="sm:hidden"><ContinueCue label="Open & scroll" /></div>
          </div>
        </section>
      ) : (
        <section ref={contentRef} className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-5 sm:py-16">
          <RecipientRibbon receiverName={receiverName} />
          <p className="caps text-primary">Unlocked Birthday Page</p>
          <h1 className="serif mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-7xl">Happy Birthday, Sunshine ✨</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">This is the part where the receiver feels it was made only for them.</p>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
            {items.map(([item, desc], i) => (
              <button key={item} onClick={() => { setMemory(i); if (i === 3) celebrate("big"); scrollToRef(contentRef); }} className={`min-w-[155px] rounded-3xl p-4 text-left shadow-ambient transition active:scale-95 hover:-translate-y-1 sm:min-w-0 sm:p-5 ${memory === i ? "bg-[#7c3aed] text-white" : "glass"}`}>
                <Sparkles size={22} />
                <h3 className="serif mt-3 text-xl font-bold">{item}</h3>
                <p className="mt-1 text-xs opacity-75">{desc}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 rounded-[2rem] bg-white p-5 shadow-glow sm:grid-cols-[1fr_1.2fr] sm:p-8">
            <PictureCard src={memory === 0 ? photos.cake : memory === 1 ? photos.friends : memory === 2 ? photos.birthday : photos.cake} title={["Cake Moment", "Best Memory", "Voice Note", "Final Blast"][memory]} subtitle={`Memory ${memory + 1}`} />
            <div className="flex flex-col justify-center text-left">
              <p className="caps text-primary">Personal Message</p>
              <h2 className="serif mt-3 text-4xl font-bold">{receiverName ? `${receiverName}, you make ordinary days magical.` : "You make ordinary days feel magical."}</h2>
              <p className="mt-4 text-muted">The buyer adds real photos, a written message, optional voice note and background music. The receiver unlocks everything step by step.</p>
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

function LoveStoryExperience({ mode, receiverName }: { mode: ExperienceMode; receiverName?: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [step, setStep] = useState(0);
  const contentRef = useRef<any>(null);
  const moments = ["How we met", "First date", "Favorite memory", "Secret message"];

  return (
    <Shell mode={mode} className="bg-[#0f172a] text-white">
      <section className="mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-5 py-14">
        {!unlocked ? (
          <div className="text-center">
            <RecipientRibbon receiverName={receiverName} light />
            <p className="caps text-[#fbdbde]">Love Story Journey</p>
            <h1 className="serif mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-7xl">Only the right heart can open this story.</h1>
            <button onClick={() => { setUnlocked(true); celebrate("soft"); scrollToRef(contentRef); }} className="group mx-auto mt-10 flex h-56 w-56 flex-col items-center justify-center rounded-full bg-[#fbdbde] text-[#0f172a] shadow-glow transition hover:scale-105">
              <LockKeyhole size={48} />
              <span className="mt-4 font-bold">Unlock My Heart</span>
            </button>
            <div className="sm:hidden"><ContinueCue label="Unlock & scroll" /></div>
          </div>
        ) : (
          <div ref={contentRef}>
            <RecipientRibbon receiverName={receiverName} light />
            <p className="caps text-[#fbdbde]">Unlocked</p>
            <h1 className="serif mt-3 max-w-3xl text-4xl font-bold sm:text-7xl">The Story of Us</h1>
            <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
              <PictureCard src={step === 0 ? photos.love : step === 1 ? photos.couple : step === 2 ? photos.anniversary : photos.love} title={moments[step]} subtitle="Tap chapters" />
              <div className="rounded-[2rem] bg-white/10 p-6 backdrop-blur sm:p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {moments.map((m, i) => <button key={m} onClick={() => { setStep(i); scrollToRef(contentRef); }} className={`rounded-2xl p-4 text-left transition active:scale-95 ${step === i ? "bg-[#fbdbde] text-[#0f172a]" : "bg-white/10"}`}>{m}</button>)}
                </div>
                <h2 className="serif mt-8 text-4xl font-bold">{receiverName ? `${receiverName}, this was made only for you.` : "Some people become home."}</h2>
                <p className="mt-4 text-white/70">Swipe-like chapters, flip cards, hidden messages and final surprise make this feel worth more than a normal greeting card.</p>
                <button onClick={() => celebrate("big")} className="mt-6 rounded-full bg-[#fbdbde] px-7 py-4 font-bold text-[#0f172a]">Reveal Final Surprise</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Shell>
  );
}

function AnniversaryExperience({ mode, receiverName }: { mode: ExperienceMode; receiverName?: string }) {
  return (
    <GenericExperience
      mode={mode}
      receiverName={receiverName}
      title="Golden Anniversary"
      subtitle="Years become chapters"
      image={photos.anniversary}
      cards={["Year 1", "Best Trip", "Promises", "Forever"]}
      theme="bg-[#f7e7ce]"
    />
  );
}

function FriendshipExperience({ mode, receiverName }: { mode: ExperienceMode; receiverName?: string }) {
  return (
    <GenericExperience
      mode={mode}
      receiverName={receiverName}
      title="Friendship Adventure"
      subtitle="Guess who made this?"
      image={photos.friends}
      cards={["Clue 1", "Funny Memory", "Roast Card", "Best Friend Award"]}
      theme="bg-[#eef2ff]"
    />
  );
}

function FamilyLetterExperience({ mode, receiverName }: { mode: ExperienceMode; receiverName?: string }) {
  return (
    <GenericExperience
      mode={mode}
      receiverName={receiverName}
      title="Family Letter"
      subtitle="A thank-you note brought to life"
      image={photos.family}
      cards={["Open Letter", "Reasons", "Voice Note", "Thank You"]}
      theme="bg-[#fff8f1]"
    />
  );
}

function GenericExperience({
  mode,
  receiverName,
  title,
  subtitle,
  image,
  cards,
  theme,
}: {
  mode: ExperienceMode;
  receiverName?: string;
  title: string;
  subtitle: string;
  image: string;
  cards: string[];
  theme: string;
}) {
  const [active, setActive] = useState(0);
  const contentRef = useRef<any>(null);
  return (
    <Shell mode={mode} className={theme}>
      <section ref={contentRef} className="mx-auto max-w-6xl px-4 py-8 sm:px-5 sm:py-20">
        <RecipientRibbon receiverName={receiverName} />
        <p className="caps text-primary">{subtitle}</p>
        <h1 className="serif mt-3 text-4xl font-bold sm:text-7xl">{title}</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <PictureCard src={image} title={cards[active]} subtitle={`Step ${active + 1}`} />
          <div className="rounded-[2rem] bg-white p-6 shadow-ambient sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map((c, i) => <button key={c} onClick={() => { setActive(i); if (i === cards.length - 1) celebrate("soft"); scrollToRef(contentRef); }} className={`rounded-2xl p-4 text-left ${active === i ? "bg-primary text-white" : "bg-surface-mid"}`}>{c}<ChevronRight className="mt-2" size={18} /></button>)}
            </div>
            <h2 className="serif mt-8 text-4xl font-bold">{receiverName ? `A personal moment for ${receiverName}.` : "A personal moment, not a static card."}</h2>
            <p className="mt-4 text-muted">Each section asks the viewer to tap, reveal or unlock something. That interaction creates curiosity and makes the page feel premium.</p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
