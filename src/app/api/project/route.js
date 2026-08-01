import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      companyName,
      projectKinds,
      details,
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
        <h2 style="color:#333;">New Project Inquiry Submission</h2>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <tr>
            <td style="border:1px solid #ddd; padding:10px; width: 250px;"><strong>Name</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${name}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Email</strong></td>
            <td style="border:1px solid #ddd; padding:10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Company Name</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${companyName || "N/A"}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Project Type(s)</strong></td>
            <td style="border:1px solid #ddd; padding:10px;">${projectKinds.join(", ")}</td>
          </tr>

          <tr>
            <td style="border:1px solid #ddd; padding:10px;"><strong>Project Details</strong></td>
            <td style="border:1px solid #ddd; padding:10px; white-space: pre-wrap;">${details}</td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Zerror Studios" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      subject: `New Project Inquiry: ${name}`,
      html: htmlTemplate,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Project submission error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
