import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Caminho para o PDF
    const pdfPath = path.join(process.cwd(), "public", "chat.pdf");

    // Verifica se o arquivo existe
    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: "PDF file not found" },
        { status: 404 }
      );
    }

    // Lê o arquivo PDF
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Envia o email com o PDF anexado
    const { data, error } = await resend.emails.send({
      from: "How-ToGuides.com <noreply@yourdomain.com>",
      to: [email],
      subject: "Your ChatGPT Mastery Kit is here! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #134CCD; text-align: center;">ChatGPT Mastery Kit</h1>
          <p>Thank you for downloading our ChatGPT Mastery Kit!</p>
          <p>In this kit, you'll find:</p>
          <ul>
            <li>Complete PDF Guide</li>
            <li>Longer Response Prompt Templates</li>
            <li>ChatGPT Version Comparison Chart</li>
            <li>Advanced Continuation Techniques</li>
            <li>Token Optimization Cheat Sheet</li>
          </ul>
          <p>Happy learning!</p>
          <p>Best regards,<br>The How-ToGuides.com Team</p>
        </div>
      `,
      attachments: [
        {
          filename: "ChatGPT-Mastery-Kit.pdf",
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
