export type TemplateCategory =
  | "Birthday"
  | "Anniversary"
  | "Wedding"
  | "Love Story"
  | "Friendship"
  | "Family";

export type Template = {
  id: string;
  slug: string;
  title: string;
  category: TemplateCategory;
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
};

export const templates: Template[] = [
  {
    id: "t1",
    slug: "wedding-royal-envelope",
    title: "Shubh Vivah Royal Card",
    category: "Wedding",
    price90: 449,
    activePeriod: "90 days",
    badge: "Premium",
    description:
      "A premium Hindu wedding card experience with Ganesh blessing, royal invitation opening, couple story, event timeline, venue location, countdown, galleries and guest wishes.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85",
    features: [
      "Ganesh blessing intro",
      "Bride & groom story",
      "Haldi, Mehendi, Sangeet & Wedding sections",
      "Venue location and maps block",
      "Wedding countdown",
      "Guest wishes UI",
      "Multiple picture galleries",
      "90 days active",
    ],
    interactions: ["Open royal envelope", "See your own name", "Reveal Ganesh blessing", "Tap event cards", "Open venue map", "Send blessings"],
    palette: ["#fcf9f8", "#685d4a", "#cec5ba", "#e7e7fb"],
    bestFor: "Hindu weddings, engagement ceremonies and premium family events",
  },
  {
    id: "t2",
    slug: "birthday-treasure-box",
    title: "Birthday Treasure Box",
    category: "Birthday",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    badge: "Launch",
    description:
      "A magical gift box opens into balloons, memories, voice notes, wishes and a confetti finale.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
    features: ["Gift box reveal", "Balloon unlocks", "Voice message", "Memory gallery", "Confetti finale"],
    interactions: ["Tap gift box", "See your own name", "Unlock balloons", "Reveal photo memories", "Play voice note", "Confetti finale"],
    palette: ["#fff7ed", "#fbdbde", "#7c3aed", "#f59e0b"],
    bestFor: "Friends, siblings, kids and surprise birthdays",
  },
  {
    id: "t3",
    slug: "love-story-journey",
    title: "Love Story Journey",
    category: "Love Story",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    badge: "Popular",
    description:
      "Unlock a heart, reveal memories, swipe photo cards and end with a secret message for someone special.",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    features: ["Heart unlock", "Timeline reveal", "Hidden notes", "Photo cards", "Final surprise"],
    interactions: ["Unlock heart", "See your own name", "Tap chapters", "Flip hidden cards", "Reveal final message"],
    palette: ["#0f172a", "#fbdbde", "#70585b", "#f7e7ce"],
    bestFor: "Girlfriend, boyfriend, proposal and romantic memories",
  },
  {
    id: "t4",
    slug: "golden-anniversary",
    title: "Golden Anniversary",
    category: "Anniversary",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "A warm anniversary timeline with year-by-year memories, vows, promises and a calm cinematic feel.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
    features: ["Timeline", "Photo gallery", "Promises", "Music", "Final letter"],
    interactions: ["Select year", "Reveal photo", "Open promise card", "Play message"],
    palette: ["#f7e7ce", "#685d4a", "#ffffff", "#70585b"],
    bestFor: "Couples and married partners",
  },
  {
    id: "t5",
    slug: "friendship-adventure",
    title: "Friendship Adventure",
    category: "Friendship",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "A fun clue-based friendship page with memories, jokes, friendship awards and a final surprise reveal.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    features: ["Guess who", "Memory quiz", "Roast cards", "Awards", "Final reveal"],
    interactions: ["Reveal clues", "Answer quiz", "Tap award cards", "Unlock secret"],
    palette: ["#e7e7fb", "#fbdbde", "#685d4a", "#ffffff"],
    bestFor: "Best friends and college groups",
  },
  {
    id: "t6",
    slug: "family-letter",
    title: "Family Letter",
    category: "Family",
    price30: 79,
    price60: 149,
    activePeriod: "30 or 60 days",
    description:
      "An emotional letter experience for mother, father, siblings and family moments with voice and reasons cards.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    features: ["Open letter", "Voice note", "Reasons cards", "Photo memories", "Thank-you screen"],
    interactions: ["Open note", "Reveal reasons", "Play voice", "Unlock final letter"],
    palette: ["#fcf9f8", "#f7e7ce", "#70585b", "#cec5ba"],
    bestFor: "Mother, father, siblings and family appreciation",
  },
];

export const categories = [
  "All Templates",
  "Birthday",
  "Anniversary",
  "Wedding",
  "Love Story",
  "Friendship",
  "Family",
] as const;

export function displayTemplatePrice(template: Template) {
  if (template.category === "Wedding") return "₹449";
  return "₹79 / ₹149";
}
