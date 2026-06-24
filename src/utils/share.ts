export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

export function buildMomentSlug(input: {
  templateCategory?: string;
  title?: string;
  yourName?: string;
  receiverName?: string;
}) {
  const category = input.templateCategory || "moment";
  const suffix = category === "Wedding" ? "wedding" : category === "Birthday" ? "birthday" : category === "Love Story" ? "love-story" : "moment";
  const base = input.title || [input.yourName, input.receiverName, suffix].filter(Boolean).join(" ");
  return slugify(base || `create-your-${suffix}`);
}

export function createMomentCode(seed?: string) {
  const now = Date.now().toString(36);
  const cleanSeed = slugify(seed || "cym").replace(/-/g, "").slice(0, 6);
  return `${cleanSeed || "cym"}-${now}`;
}

export function getOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "https://createyourmoments.com";
}

export function createShareUrl(slug: string) {
  return `${getOrigin()}/celebrate/${slug || "demo-moment"}`;
}

export function createPersonalShareUrl(args: {
  slug: string;
  code?: string;
  receiverName?: string;
}) {
  const code = args.code || createMomentCode(args.slug);
  const base = `${getOrigin()}/invite/${code}/${args.slug || "demo-moment"}`;
  return args.receiverName ? `${base}?to=${encodeURIComponent(args.receiverName)}` : base;
}

export function createWhatsAppText(args: {
  slug: string;
  title: string;
  category?: string;
  senderName?: string;
  receiverName?: string;
  eventDate?: string;
  venue?: string;
  code?: string;
}) {
  const url = createPersonalShareUrl({ slug: args.slug, code: args.code, receiverName: args.receiverName });
  const isWedding = args.category === "Wedding";
  if (isWedding) {
    return [
      args.receiverName ? `Dear ${args.receiverName},` : "",
      "",
      `💍 ${args.title}`,
      "",
      "You are warmly invited to celebrate this special wedding moment with us.",
      args.eventDate ? `📅 Date: ${args.eventDate}` : "",
      args.venue ? `📍 Venue: ${args.venue}` : "",
      "",
      "Open your personal digital invitation here:",
      url,
      "",
      "No app install. No login required.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    args.receiverName ? `Hi ${args.receiverName},` : "",
    "",
    `✨ ${args.title}`,
    "",
    `${args.senderName || "Someone special"} created a personal digital moment ${args.receiverName ? `for you` : "for you"}.`,
    "Open it here:",
    url,
    "",
    "No app install. No login required.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

export function openWhatsApp(text: string) {
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
}
