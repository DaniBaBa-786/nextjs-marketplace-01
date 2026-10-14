// Order confirmation emails
const SENDGRID_API_KEY = "SG.SkeamoQaNotReal0003.SkeamoQaNotReal0004y";

export async function sendReceipt(to, orderId) {
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ personalizations: [{ to: [{ email: to }] }], subject: `Order #${orderId} confirmed` }),
  }).catch(() => null);
}
