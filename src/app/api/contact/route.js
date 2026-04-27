import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      phoneNumber,
      email,
      helpType,
      socialSources,
    } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    // 📩 HTML EMAIL TEMPLATE (TABLE FORMAT)
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color:#333;">New Contact Submission</h2>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>First Name</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${firstName}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Phone</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${phoneNumber}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Email</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${email}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Help Type</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${helpType}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Source</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${socialSources.join(", ")}</td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Zerror Studios" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      subject: "New Contact Form Submission",
      html: htmlTemplate,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}