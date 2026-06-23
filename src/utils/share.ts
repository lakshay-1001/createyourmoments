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

export function getOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "https://createyourmoments.com";
}

export function createShareUrl(slug: string) {
  return `${getOrigin()}/celebrate/${slug || "demo-moment"}`;
}

export function createWhatsAppText(args: {
  slug: string;
  title: string;
  category?: string;
  senderName?: string;
  receiverName?: string;
  eventDate?: string;
  venue?: string;
}) {
  const url = createShareUrl(args.slug);
  const isWedding = args.category === "Wedding";
  if (isWedding) {
    return [
      `💍 ${args.title}`,
      "",
      "You are warmly invited to celebrate this special wedding moment with us.",
      args.eventDate ? `📅 Date: ${args.eventDate}` : "",
      args.venue ? `📍 Venue: ${args.venue}` : "",
      "",
      "Open the digital invitation here:",
      url,
      "",
      "No app install. No login required.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    `✨ ${args.title}`,
    "",
    `${args.senderName || "Someone special"} created a personal digital moment ${args.receiverName ? `for ${args.receiverName}` : "for you"}.`,
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
