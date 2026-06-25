
export type TemplateCategory =
  | "Birthday"
  | "Wedding"
  | "Engagement"
  | "Love Story"
  | "Valentine"
  | "Anniversary"
  | "Friendship"
  | "Family"
  | "Custom";

export type Template = {
  id: string;
  slug: string;
  title: string;
  category: TemplateCategory;
  occasion?: string;
  price30?: number;
  price60?: number;
  price90?: number;
  activePeriod: string;
  badge?: string;
  description: string;
  image: string;
  features: string[];
  interactions: string[];
  palette: string[];
  bestFor: string;
  inputHints?: string[];
};

export const templates: Template[] = [
  {
    id: "t1",
    slug: "hindu-wedding-royal-invite",
    title: "Royal Hindu Wedding / Engagement Card",
    category: "Wedding",
    occasion: "Wedding or Engagement",
    price90: 449,
    activePeriod: "90 days",
    badge: "Premium ₹449",
    description:
      "A premium Hindu wedding or engagement invitation experience with a royal envelope, Ganesh blessing, couple reveal, event flow, venue, family note and personalized guest name in the URL.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85",
    features: [
      "Works for wedding and engagement",
      "No pre-wedding couple photos required",
      "Ganesh blessing intro",
      "Bride & groom / couple reveal",
      "Haldi, Mehendi, Sangeet, Engagement or Wedding events",
      "Venue and Google Maps block",
      "Personalized guest name from link",
      "90 days active",
    ],
    interactions: [
      "Open royal envelope",
      "Read personalized guest welcome",
      "Tap story, events, venue and blessings",
      "Auto-scroll guided journey",
      "Send trusted WhatsApp message",
    ],
    palette: ["#fff7ed", "#7c2d12", "#f59e0b", "#ffffff"],
    bestFor: "Hindu weddings, ring ceremonies, roka, engagement and premium family invitations",
    inputHints: [
      "Bride/groom names or couple names",
      "Wedding or engagement date",
      "Venue and Google Maps link",
      "Optional simple portrait or invitation-style image",
      "Family names are optional",
    ],
  },
  {
    id: "t2",
    slug: "birthday-treasure-box",
    title: "Birthday Treasure Box",
    category: "Birthday",
    occasion: "Birthday",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    badge: "Best Starter",
    description:
      "A gift box opens into balloons, photo memories, wishes, voice note prompt and confetti finale. Made for quick birthday surprises that feel personal.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Gift box opening",
      "Photo memory cards",
      "Birthday message reveal",
      "Voice note placeholder",
      "Confetti finale",
    ],
    interactions: [
      "Tap gift",
      "Unlock 3 memories",
      "Reveal message",
      "Auto-scroll finale",
    ],
    palette: ["#fff7ed", "#fbdbde", "#7c3aed", "#f59e0b"],
    bestFor: "Friends, siblings, kids, partner and last-minute birthday surprises",
  },
  {
    id: "t3",
    slug: "love-story-journey",
    title: "Love Story Journey",
    category: "Love Story",
    occasion: "Love Story",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    badge: "Most Emotional",
    description:
      "A romantic lock-screen style experience where the receiver unlocks the heart, reveals chapters and reaches a final secret message.",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Heart unlock",
      "Story chapters",
      "Hidden promise cards",
      "Photo slots",
      "Final surprise note",
    ],
    interactions: [
      "Unlock heart",
      "Tap chapters",
      "Reveal hidden notes",
      "Auto-scroll to final message",
    ],
    palette: ["#0f172a", "#fbdbde", "#70585b", "#f7e7ce"],
    bestFor: "Girlfriend, boyfriend, wife, husband, crush, proposal and romantic memories",
  },
  {
    id: "t4",
    slug: "valentine-week-love-unlock",
    title: "Valentine Week Love Unlock",
    category: "Valentine",
    occasion: "Valentine Week",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    badge: "2027 Focus",
    description:
      "A Valentine Week experience covering Rose Day, Propose Day, Chocolate Day, Teddy Day, Promise Day, Hug Day, Kiss Day and Valentine's Day with tap-to-unlock surprises.",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=80",
    features: [
      "8 Valentine Week cards",
      "Rose Day reveal",
      "Propose Day ring box",
      "Promise unlocks",
      "Final Valentine's message",
    ],
    interactions: [
      "Tap each Valentine day",
      "Open mini surprises",
      "Reveal final love note",
      "Share with custom name",
    ],
    palette: ["#fff1f2", "#be123c", "#fb7185", "#ffffff"],
    bestFor: "Valentine Week 2027, couples, crush and romantic proposals",
  },
  {
    id: "t5",
    slug: "anniversary-time-capsule",
    title: "Anniversary Time Capsule",
    category: "Anniversary",
    occasion: "Anniversary",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "A warm timeline where each year unlocks a memory, promise and future dream. Calm, premium and emotional.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
    features: ["Timeline", "Promise cards", "Photo slots", "Future dreams", "Final letter"],
    interactions: ["Select year", "Reveal photo", "Open promise", "Read final letter"],
    palette: ["#f7e7ce", "#685d4a", "#ffffff", "#70585b"],
    bestFor: "Married couples and long-term relationships",
  },
  {
    id: "t6",
    slug: "friendship-adventure",
    title: "Friendship Adventure",
    category: "Friendship",
    occasion: "Friendship",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "A fun clue-based friendship experience with memory quiz, roast cards, awards and a final reveal.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    features: ["Guess who", "Memory quiz", "Roast cards", "Awards", "Final reveal"],
    interactions: ["Reveal clues", "Tap awards", "Unlock secret", "Share with friend"],
    palette: ["#e7e7fb", "#fbdbde", "#685d4a", "#ffffff"],
    bestFor: "Best friends, college groups and friendship day",
  },
  {
    id: "t7",
    slug: "family-blessing-letter",
    title: "Family Blessing Letter",
    category: "Family",
    occasion: "Family Appreciation",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "An emotional letter experience for mother, father, siblings and family. It focuses on reasons cards, gratitude and voice note prompts.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    features: ["Open letter", "Reasons cards", "Voice note prompt", "Photo memories", "Thank-you screen"],
    interactions: ["Open note", "Reveal reasons", "Play message", "Unlock final letter"],
    palette: ["#fcf9f8", "#f7e7ce", "#70585b", "#cec5ba"],
    bestFor: "Mother, father, siblings, grandparents and family appreciation",
  },
];

export const categories = [
  "All Templates",
  "Birthday",
  "Wedding",
  "Love Story",
  "Valentine",
  "Anniversary",
  "Friendship",
  "Family",
] as const;

export function displayTemplatePrice(template: Template) {
  if (template.category === "Wedding" || template.category === "Engagement") return "₹449 / 90 days";
  return "₹79 / 30 days · ₹149 / 60 days";
}

export function defaultPlanForTemplate(template: Template) {
  if (template.category === "Wedding" || template.category === "Engagement") {
    return { id: "wedding-90", amount: 449, durationDays: 90 };
  }
  return { id: "standard-60", amount: 149, durationDays: 60 };
}
