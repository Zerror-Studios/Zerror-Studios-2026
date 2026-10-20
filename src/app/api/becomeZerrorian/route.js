import nodemailer from "nodemailer";

const RECIPIENT = process.env.NEXT_PUBLIC_CLIENT_EMAIL || "admin@zerrorstudios.com";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req) {
  try {
    const formData = await req.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const role = formData.get("role");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const about = formData.get("about");
    const file = formData.get("resume");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    let attachments = [];

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: RECIPIENT,
      subject: "New Zerrorian Form Submission",
      html: `
        <h2>New Zerrorian Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><b>Role:</b> ${escapeHtml(role)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone)}</p>
        <p><b>About:</b> ${escapeHtml(about)}</p>
      `,
      attachments,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.log(err);
    return Response.json({ success: false }, { status: 500 });
  }
}