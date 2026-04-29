import nodemailer from "nodemailer";

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
      to: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      subject: "New Zerrorian Form Submission",
      html: `
        <h2>New Zerrorian Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>About:</b> ${about}</p>
      `,
      attachments,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.log(err);
    return Response.json({ success: false }, { status: 500 });
  }
}