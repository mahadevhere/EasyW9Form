import FormData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
// const MAILGUN_URL = process.env.MAILGUN_URL || "https://api.mailgun.net"; // Default to US, change for EU

export async function sendEmail({ to, subject, text, html, from }) {
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.error("Mailgun configuration missing (MAILGUN_API_KEY or MAILGUN_DOMAIN)");
    throw new Error("Mailgun configuration missing");
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
  });

  const defaultFrom = `EasyW9Form <support@${MAILGUN_DOMAIN}>`; // Matches your Mailgun domain

  try {
    const bccEmail = process.env.BCC_EMAIL || "easywform@gmail.com";
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      from: from || defaultFrom,
      to: Array.isArray(to) ? to : [to],
      bcc: bccEmail,
      "h:Reply-To": bccEmail,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Mailgun send result:", result);
    return result;
  } catch (error) {
    console.error("Mailgun send error:", error);
    throw error;
  }
}
