import Layout from "../components/Layout";

export default function Legal({ type }: { type: "privacy" | "terms" | "copyright" }) {
  const title = type === "privacy" ? "Privacy Policy" : type === "terms" ? "Terms & Conditions" : "Copyright & Takedown Policy";
  const updated = "Last updated: June 2026";
  return (
    <Layout>
      <section className="container-pad py-16">
        <div className="mx-auto max-w-4xl">
          <p className="caps text-primary">Legal</p>
          <h1 className="serif mt-3 text-4xl font-bold sm:text-6xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">{updated}. This starter legal content should be reviewed by a qualified professional before full public launch.</p>

          {type === "privacy" && <Content sections={privacySections} />}
          {type === "terms" && <Content sections={termsSections} />}
          {type === "copyright" && <Content sections={copyrightSections} />}
        </div>
      </section>
    </Layout>
  );
}

function Content({ sections }: { sections: [string, string][] }) {
  return <div className="mt-8 space-y-5">{sections.map(([h, p]) => <section key={h} className="glass rounded-3xl p-6"><h2 className="serif text-2xl font-bold text-text">{h}</h2><p className="mt-3 leading-relaxed text-muted">{p}</p></section>)}</div>;
}

const privacySections: [string, string][] = [
  ["What we collect", "We collect information required to create and deliver personalized digital celebration pages, such as names, event details, messages, uploaded photos, audio, contact details and payment/order information."],
  ["How we use it", "We use customer information to generate the selected moment, provide access during the purchased active period, offer support, improve templates and communicate important service updates."],
  ["User uploads", "Photos, audio, text and other uploads remain the responsibility of the uploading user. Users should only upload content they own or have permission to use."],
  ["Storage period", "Content may remain available during the purchased active period, such as 30 days, 60 days or 90 days depending on the selected plan. After expiry, access may be disabled or content may be removed."],
  ["Contact", "For privacy questions, contact support@createyourmoments.com."],
];

const termsSections: [string, string][] = [
  ["Service", "CreateYourMoments provides personalized interactive digital celebration pages for occasions such as birthdays, weddings, anniversaries, friendship, family appreciation and love stories."],
  ["Pricing and active period", "Standard templates are offered at ₹79 for 30 days and ₹149 for 60 days. The Wedding Card Experience is offered at ₹449 for 90 days. These are one-time purchases, not subscriptions."],
  ["User responsibility", "Users are responsible for all content they upload, including photos, audio, text, names, location details and messages. Users must not upload illegal, harmful, infringing or abusive content."],
  ["Availability", "We aim to keep pages accessible during the active period, but temporary downtime can occur due to maintenance, hosting providers, internet issues or third-party services."],
  ["Refunds", "Before full payment integration, refund rules should be finalized clearly. For MVP launch, consider manual support review for duplicate payments or technical delivery failures."],
];

const copyrightSections: [string, string][] = [
  ["User-uploaded content", "Users must confirm they own or have permission to use uploaded images, songs, voice notes, videos, text and other materials."],
  ["Reporting infringement", "Copyright owners can report suspected infringing content by emailing support@createyourmoments.com with the page link, proof of ownership and details of the claimed infringement."],
  ["Takedown", "Reported content may be removed, disabled or restricted while we review the complaint. Repeat or serious violations may result in access removal."],
  ["No ignored complaints", "CreateYourMoments should not ignore valid copyright complaints. Prompt review and removal reduces legal and platform risk."],
];
