import nodemailer from "nodemailer";

const RECIPIENT = process.env.NEXT_PUBLIC_CLIENT_EMAIL || "admin@zerrorstudios.com";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatValue = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (value === undefined || value === null) return "";
  return String(value).trim();
};

const firstFilled = (...values) => values.map(formatValue).find((v) => v) || "";

export async function POST(req) {
  try {
    const body = await req.json();

    // Supports both the new contact form fields and the older ones.
    const rows = [
      ["Name", firstFilled(body.name, body.firstName)],
      ["Brand or company", firstFilled(body.brand, body.companyName)],
      ["Email", firstFilled(body.email)],
      ["Phone", firstFilled(body.phone, body.phoneNumber)],
      ["Services", firstFilled(body.services, body.helpType)],
      ["Details", firstFilled(body.details, body.message, body.about)],
      ["Budget", firstFilled(body.budget)],
      ["Source", firstFilled(body.source, body.socialSources)],
    ].filter(([, value]) => value);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#333;">New contact submission</h2>

        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          ${rows
            .map(
              ([label, value]) => `
          <tr>
            <td style="border:1px solid #ddd; padding:10px; width: 200px;"><strong>${label}</strong></td>
            <td style="border:1px solid #ddd; padding:10px; white-space: pre-wrap;">${escapeHtml(value)}</td>
          </tr>`
            )
            .join("")}
        </table>
      </div>
    `;

    const email = formatValue(body.email);

    await transporter.sendMail({
      from: `"Zerror Studios" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: RECIPIENT,
      ...(email ? { replyTo: email } : {}),
      subject: "New contact form submission",
      html: htmlTemplate,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
