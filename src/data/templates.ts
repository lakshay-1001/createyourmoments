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
  price: number;
  badge?: string;
  description: string;
  image: string;
  features: string[];
  palette: string[];
  bestFor: string;
};
export const templates: Template[] = [
  {
    id: "t1",
    slug: "ethereal-union",
    title: "Ethereal Union",
    category: "Wedding",
    price: 499,
    badge: "Popular",
    description:
      "A luxury wedding invitation with envelope reveal, RSVP, venue details and guest wishes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8DQHe2zzd0yf9tVyGrRtOAJQ4WT3QrBFJLxQ-SIylPuz2IYeJayrl1XGEufBsIpQFs442uJuQbxbt9MK87P9GXyGx2BehuWFk7en4GzMSjAFS8qhdgjGB31IeHjSOWeWUubU81k3Xa0juSnAgNXiZn2jVQLralcqYTQY_z0NjZ7FMQR7GnGvjndEyyK0B_FVKu_A1JXsOi64TJ-dUGlo3Qc44v44Ggg05ZrQrGcEdj6S7hTnohku5cCXQOZQD2He7GBZzHeg1Ipw",
    features: ["Envelope opening", "RSVP manager", "Venue map", "Guest wishes"],
    palette: ["#fcf9f8", "#685d4a", "#cec5ba", "#e7e7fb"],
    bestFor: "Premium wedding invitations",
  },
  {
    id: "t2",
    slug: "birthday-treasure-box",
    title: "Birthday Treasure Box",
    category: "Birthday",
    price: 149,
    badge: "Launch",
    description:
      "A magical gift box opens into balloons, memories, voice notes and confetti.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr0CkjAWJiSfccvp4pLoHJogiOoSJTbvnb2t5-fRxEPcaBLw5_1Uk3mGaIE_UOn2p6RtzlzKZmELomSBoxJG9QT-2wU4IyBnJndoSZgU2RUyZobgXcOx5BHs6j4-pF06FrvrRtk9d98pIWWDaEMvlHMWCQfc5glgkBWsxci6vTdoQtgDWS1Ut6adzhUw8ZRStSVmRFrTPeg7xcU8HZC3g9OgcUzS4P1Er_RSxUD9cJbLVfwh6rYoC1KwuoY363AUjJ3Q5mprbiHGI",
    features: [
      "Gift box reveal",
      "Balloon unlocks",
      "Voice message",
      "Confetti finale",
    ],
    palette: ["#fff7ed", "#fbdbde", "#7c3aed", "#f59e0b"],
    bestFor: "Friends, siblings and kids",
  },
  {
    id: "t3",
    slug: "love-story-journey",
    title: "Love Story Journey",
    category: "Love Story",
    price: 249,
    badge: "Popular",
    description:
      "Unlock a heart, reveal memories, swipe photo cards and end with a secret message.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0d-t4jiZMbQqWWXQCmLLQ9egSNa7HV7qJ9gpeeyDRRTvjb38sOYyCYI0ajR9rhoBfKtAhvrsEgeNSMzNhSXNt2GQtzkhtlNclgipp_trJZPwtOf55L74GdsjtVIiFTbOSobVRWVX7GcZ4r_Jk2xhrVWjNYQpmiMEsc_9vsk1NSAs1TfNbqwSb1XU4Y7Eafmm69Q9xwesMmOPLtAk6ZcjFQ8d6gBYdI2pSPB-aywZ8pW-UOptX6LwRdNSb6A05Q0RuUj7Ak5bPAXU",
    features: [
      "Heart unlock",
      "Timeline reveal",
      "Hidden notes",
      "Final surprise",
    ],
    palette: ["#0f172a", "#fbdbde", "#70585b", "#f7e7ce"],
    bestFor: "Girlfriend, boyfriend, proposal",
  },
  {
    id: "t4",
    slug: "golden-decade",
    title: "Golden Decade",
    category: "Anniversary",
    price: 249,
    description:
      "A romantic anniversary timeline with year-by-year memories and future promises.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRRk2dOCpsk2GKPGbLsULi23nOUTyxcwIpUWeIrTyeILOeHpUYLr6HGBwJisL_G7vgRXvNIgyvSoFoNfCM4_T1mrqqCZUq0-TqJ56iOXUszpA6i22OJes4AYeXk3gYR_WpaA5I3yxgae5ER4yT5fILuhjhD8ePE9D63JrNAHQ73QfOtibL6yeoqOJR9AvarydA82jc9BIQk5RpTcvT1f1KV8JhVT7vsXOIGj5PPOGYxJawCJ7MpY3F8WFrXckNKAEpAystqzjl9v0",
    features: ["Timeline", "Photo gallery", "Promises", "Music"],
    palette: ["#f7e7ce", "#685d4a", "#fff", "#70585b"],
    bestFor: "Couples and married partners",
  },
  {
    id: "t5",
    slug: "friendship-adventure",
    title: "Friendship Adventure",
    category: "Friendship",
    price: 149,
    description:
      "A fun clue-based friendship page with memories, jokes and awards.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCWNOE1E3DfaDM4CDKpsSQhoCI1MFwJvnOy1dRKGVbobyzThWXz4KxdJpRrnoTXNAeFzIM2d2Ab360yyC4a66qIeQSVQmPDREXiFujM4l2Naxn6dI7LtE7buKUrn6hNKkciz89GvbD_ukG--DGiPsAwpbA-2kDbQKzQO8oXEJwsGovLMAAisuga7UKoidAbW_9-HU3VYVoUVwI30b5g6Y9RafZf1QcUampfzQy__wI6z1bmqiQyIEx37ylOjex5HbWhRXuVXxeYUw",
    features: ["Guess who", "Memory quiz", "Roast cards", "Final reveal"],
    palette: ["#e7e7fb", "#fbdbde", "#685d4a", "#fff"],
    bestFor: "Best friends",
  },
  {
    id: "t6",
    slug: "family-letter",
    title: "Family Letter",
    category: "Family",
    price: 199,
    description:
      "An emotional letter experience for mother, father, siblings and family moments.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACQpvQHdcB_ORjy6TIRWR7LiVJ3KDzIyedisSIQuTLkkGIQ8I0Fn-4TzqU6Bx-hV09Aq02SOgja2hlyazEpmVqrk8v_pwkkompob3PTai9vM2aSizDae61Lza0NREED9NvwFoTmqbdg752ZXdVDpOLgFbK8U7UqUqu2DH2ypQAU4a46E4yYyisRWgaHeB0W0ssp7gD3pcmf9KtMAtg3N0XpxA7C0gs5YvLPX2GqY_fsl0E4MPn0Z4zVT-7siD1epqAtb69W3qpI0o",
    features: ["Open letter", "Voice note", "Reasons cards", "Photo memories"],
    palette: ["#fcf9f8", "#f7e7ce", "#70585b", "#cec5ba"],
    bestFor: "Mother, father and family",
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
