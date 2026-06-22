import Layout from "../components/Layout";
export default function Legal({
  type,
}: {
  type: "privacy" | "terms" | "copyright";
}) {
  const title =
    type === "privacy"
      ? "Privacy Policy"
      : type === "terms"
        ? "Terms of Service"
        : "Copyright & Takedown Policy";
  return (
    <Layout>
      <section className="container-pad py-16">
        <div className="mx-auto max-w-3xl">
          <p className="caps text-primary">Legal</p>
          <h1 className="serif mt-3 text-5xl font-bold">{title}</h1>
          <div className="prose mt-8 max-w-none text-muted">
            <p>
              This is a starter page for MVP. Before launch, review this with a
              qualified professional.
            </p>
            <h2 className="serif text-2xl text-text">User content</h2>
            <p>
              Users are responsible for the photos, audio, text and other
              content they upload. They must confirm they own the content or
              have permission to use it.
            </p>
            <h2 className="serif text-2xl text-text">Takedown</h2>
            <p>
              Copyright owners can report infringing content through
              support@createyourmoments.com. We will review and remove reported
              content where appropriate.
            </p>
            <h2 className="serif text-2xl text-text">Data</h2>
            <p>
              We collect only the information needed to create and deliver
              personalized digital celebration pages.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
