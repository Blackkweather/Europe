import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required").max(10000),
  subject: z.string().max(200).optional(),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.CONTACT_EMAIL ?? "info@europeanera.eu";
const fromEmail = process.env.FROM_EMAIL ?? "European Era <onboarding@resend.dev>";

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, message, subject: subjectLine } = parsed.data;

  if (!resend) {
    return NextResponse.json(
      { error: "Contact form is not configured. Set RESEND_API_KEY and CONTACT_EMAIL." },
      { status: 503 }
    );
  }

  const emailSubject = subjectLine
    ? `Contact: ${subjectLine}`
    : "Website contact form";

  const html = `
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    ${subjectLine ? `<p><strong>Subject / interest:</strong> ${escapeHtml(subjectLine)}</p>` : ""}
    <hr style="border:0;border-top:1px solid #eee;margin:1em 0" />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: emailSubject,
    html,
  });

  if (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
