export type Plan = {
  id: string;
  name: string;
  price: number;
  displayPrice: string;
  validity: string;
  audience: string;
  popular?: boolean;
  premium?: boolean;
  description: string;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "standard-30",
    name: "30 Day Moment",
    price: 79,
    displayPrice: "₹79",
    validity: "Active for 30 days",
    audience: "Best for quick birthday, friendship and simple surprise pages",
    description: "A beautiful interactive page for one special occasion. Low cost, easy to share and perfect for testing your first moment.",
    features: [
      "1 standard interactive template",
      "Personalized names and messages",
      "Photo gallery support",
      "Voice note or royalty-free music option",
      "Confetti and reveal interactions",
      "Unlimited views during active period",
      "Shareable public link",
      "Mobile-first responsive page",
    ],
    cta: "Choose 30 Days",
  },
  {
    id: "standard-60",
    name: "60 Day Moment",
    price: 149,
    displayPrice: "₹149",
    validity: "Active for 60 days",
    audience: "Best for birthdays, anniversaries, love stories and family moments",
    popular: true,
    description: "Our recommended plan for most celebrations. Gives enough time before and after the event for sharing with friends and family.",
    features: [
      "Everything in 30 Day Moment",
      "Longer 60 day active period",
      "More memory sections",
      "Multiple interactive reveals",
      "Better for Instagram and WhatsApp sharing",
      "Edit details before final publish",
      "Priority template support after launch",
      "Made with CreateYourMoments footer",
    ],
    cta: "Choose 60 Days",
  },
  {
    id: "wedding-90",
    name: "Wedding Card Experience",
    price: 449,
    displayPrice: "₹449",
    validity: "Active for 90 days",
    audience: "Best for weddings, engagement invites and premium family events",
    premium: true,
    description: "A premium wedding invitation experience with venue, RSVP-style sections, multiple photos and rich interactive storytelling.",
    features: [
      "Luxury wedding invitation template",
      "Bride and groom introduction",
      "Wedding date countdown",
      "Multiple picture sections",
      "Venue and location map section",
      "Event timeline: Haldi, Mehndi, Wedding, Reception",
      "Guest wishes and RSVP-style UI",
      "Premium animation and envelope opening",
      "90 day active period",
    ],
    cta: "Choose Wedding Card",
  },
];
