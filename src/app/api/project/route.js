import nodemailer from "nodemailer";

const RECIPIENT = process.env.NEXT_PUBLIC_CLIENT_EMAIL || "admin@zerrorstudios.com";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name = "",
      email = "",
      companyName = "",
      projectKinds = [],
      details = "",
    } = body;

    const kinds = Array.isArray(projectKinds) ? projectKinds.join(", ") : String(projectKinds);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#333;">New project enquiry</h2>

        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <tr>
            <td style="border:1px solid #ddd; padding:10px; width: 250px;"><strong>Name</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${escapeHtml(name)}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Email</strong></td>
            <td style="border:1px solid #ddd; padding:10px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Company name</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${escapeHtml(companyName) || "N/A"}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Project type(s)</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${escapeHtml(kinds)}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Project details</strong></td>
            <td style="border:1px solid #ddd; padding:10px; white-space: pre-wrap;">${escapeHtml(details)}</td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Zerror Studios" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: RECIPIENT,
      ...(email ? { replyTo: email } : {}),
      subject: `New project enquiry: ${String(name).replace(/[\r\n]+/g, " ")}`,
      html: htmlTemplate,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Project submission error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
