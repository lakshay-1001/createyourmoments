import Layout from "../components/Layout";
import { Mail, ShieldAlert, Wand2 } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <section className="container-pad py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <p className="caps text-primary">Contact</p>
            <h1 className="serif mt-3 text-4xl font-bold sm:text-6xl">Need help creating a moment?</h1>
            <p className="mt-5 max-w-xl text-muted">Use this page for support, custom wedding requests, copyright reports and early customer feedback.</p>
            <div className="mt-8 grid gap-4">
              <Info icon={<Mail />} title="General support" value="support@createyourmoments.com" />
              <Info icon={<Wand2 />} title="Custom template request" value="Tell us your occasion and deadline." />
              <Info icon={<ShieldAlert />} title="Copyright report" value="Send the page link and ownership details." />
            </div>
          </div>
          <form className="glass rounded-[2rem] p-6 sm:p-8">
            <input className="field" placeholder="Your name" />
            <input className="field mt-4" placeholder="Email" />
            <select className="field mt-4"><option>General support</option><option>Custom wedding design</option><option>Copyright report</option><option>Payment help</option></select>
            <textarea className="field mt-4 min-h-40" placeholder="Message" />
            <button type="button" className="btn-primary mt-6 w-full py-4">Send Message</button>
            <p className="mt-4 text-center text-xs text-muted">Form submission will be connected later. For now, use support@createyourmoments.com.</p>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return <div className="glass flex gap-4 rounded-3xl p-5"><div className="text-primary">{icon}</div><div><b>{title}</b><p className="text-sm text-muted">{value}</p></div></div>;
}
