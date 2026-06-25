
import { useState } from "react";
import Layout from "../components/Layout";
import { Mail, ShieldAlert, Wand2, CheckCircle, Loader2 } from "lucide-react";
import { saveContactMessage } from "../lib/supabaseClient";
import { sendSupportEmail } from "../lib/email";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General support",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setNote("Please fill name, email and message.");
      return;
    }

    setStatus("sending");
    setNote("");

    const dbResult = await saveContactMessage(form);

    try {
      await sendSupportEmail(form);
      setStatus("sent");
      setNote("Message sent successfully. We will reply from support@createyourmoment.com.");
      setForm({ name: "", email: "", phone: "", topic: "General support", message: "" });
    } catch {
      if (dbResult.error) {
        setStatus("error");
        setNote("Message could not be sent. Please email support@createyourmoment.com directly.");
      } else {
        setStatus("sent");
        setNote("Your message was saved. Email delivery needs EmailJS template setup, but we received the lead in Supabase/local backup.");
      }
    }
  }

  return (
    <Layout>
      <section className="container-pad py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <p className="caps text-primary">Contact Create Your Moments</p>
            <h1 className="serif mt-3 text-4xl font-bold leading-tight sm:text-6xl">
              Need help creating a beautiful moment?
            </h1>
            <p className="mt-5 max-w-xl text-muted">
              Use this form for support, custom wedding/engagement requests, copyright reports and early customer feedback.
            </p>
            <div className="mt-8 grid gap-4">
              <Info icon={<Mail />} title="Support email" value="support@createyourmoment.com" />
              <Info icon={<Wand2 />} title="Custom design request" value="Tell us your occasion, deadline and budget." />
              <Info icon={<ShieldAlert />} title="Copyright report" value="Send the page link and ownership details." />
            </div>

            <div className="mt-8 rounded-[2rem] bg-cream p-5 text-sm leading-7 text-muted">
              <b className="text-text">Email setup note:</b> The form uses the EmailJS sending pattern from your ReadyGO project and also saves the message to Supabase/local backup. Make sure your EmailJS template sends to <b>support@createyourmoment.com</b>.
            </div>
          </div>

          <form onSubmit={submit} className="glass rounded-[2rem] p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="field"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <input
                className="field"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <input
              className="field mt-4"
              placeholder="Phone / WhatsApp optional"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
            <select
              className="field mt-4"
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
            >
              <option>General support</option>
              <option>Custom wedding / engagement design</option>
              <option>Birthday or love story help</option>
              <option>Payment help</option>
              <option>Copyright report</option>
              <option>Business partnership</option>
            </select>
            <textarea
              className="field mt-4 min-h-40"
              placeholder="Tell us what you need..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
            <button disabled={status === "sending"} className="btn-primary mt-6 flex w-full items-center justify-center gap-2 py-4">
              {status === "sending" ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {note && (
              <div className={`mt-4 rounded-2xl p-4 text-sm ${status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                {status === "sent" && <CheckCircle size={16} className="mr-2 inline" />}
                {note}
              </div>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Info({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="glass flex gap-4 rounded-3xl p-5">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-muted">{value}</p>
      </div>
    </div>
  );
}
