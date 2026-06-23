import Layout from "../components/Layout";

const faqs = [
  ["Is this a subscription?", "No. CreateYourMoments uses one-time pricing. Standard templates can be active for 30 days at ₹79 or 60 days at ₹149. Wedding Card Experience is ₹449 for 90 days."],
  ["What happens after the active period ends?", "The public moment link may stop being accessible after the purchased active period. Later we can add an extend/renew option from the dashboard."],
  ["Can users upload songs?", "The product flow can support audio, but users must confirm they own the content or have permission. Reported copyrighted content can be removed under the copyright policy."],
  ["Can I share the page with many people?", "Yes. During the active period, the customer can share the link on WhatsApp, Instagram, Facebook, email or anywhere else."],
  ["What is included in the wedding card?", "The wedding card includes premium envelope opening, couple story, event timeline, multiple pictures, venue location section, countdown, guest wishes UI and 90 days active period."],
  ["Will this work on mobile?", "Yes. The website and moments are designed mobile-first because most customers and guests will open links from WhatsApp and Instagram."],
];

export default function FAQ() {
  return (
    <Layout>
      <section className="mesh py-16 text-center sm:py-24">
        <div className="container-pad">
          <p className="caps text-primary">FAQ</p>
          <h1 className="serif mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-6xl">Answers before customers buy.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted">Clear answers reduce confusion and improve trust before checkout.</p>
        </div>
      </section>
      <section className="container-pad py-14">
        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map(([q, a]) => (
            <details key={q} className="glass rounded-3xl p-6 open:shadow-glow">
              <summary className="cursor-pointer font-serif text-xl font-bold">{q}</summary>
              <p className="mt-4 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </Layout>
  );
}
