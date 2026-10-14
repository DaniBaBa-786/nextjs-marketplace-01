// Order confirmation emails
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  throw new Error("Missing required environment variable: SENDGRID_API_KEY");
}

export async function sendReceipt(to, orderId) {
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }], subject: `Order #${orderId} confirmed` }),
  }).catch(() => null);
}
