import Layout from "../components/Layout";
export default function Contact() {
  return (
    <Layout>
      <section className="container-pad py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div>
            <p className="caps text-primary">Contact</p>
            <h1 className="serif mt-3 text-5xl font-bold">
              Need help creating a moment?
            </h1>
            <p className="mt-5 text-muted">
              Use this page for support, copyright reports and custom
              wedding/template requests.
            </p>
            <div className="mt-8 rounded-3xl bg-cream p-6">
              <b>Email</b>
              <p className="text-muted">support@createyourmoments.com</p>
            </div>
          </div>
          <form className="glass rounded-3xl p-8">
            <input className="field" placeholder="Your name" />
            <input className="field mt-4" placeholder="Email" />
            <select className="field mt-4">
              <option>General support</option>
              <option>Custom design</option>
              <option>Copyright report</option>
            </select>
            <textarea className="field mt-4 min-h-40" placeholder="Message" />
            <button type="button" className="btn-primary mt-6 w-full py-4">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
