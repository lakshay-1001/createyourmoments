
import emailjs from "@emailjs/browser";

export async function sendSupportEmail(payload: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_xkxzc4n";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_2m9jcng";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "vKEy0T4LoYEzfCAeL";
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || "support@createyourmoment.com";

  return emailjs.send(
    serviceId,
    templateId,
    {
      to_email: supportEmail,
      support_email: supportEmail,
      from_name: payload.name,
      from_email: payload.email,
      phone: payload.phone || "Not provided",
      subject: `Create Your Moments - ${payload.topic}`,
      topic: payload.topic,
      message: payload.message,
      reply_to: payload.email,
      source: "CreateYourMoments contact form",
    },
    { publicKey }
  );
}
