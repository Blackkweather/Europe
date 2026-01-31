import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email("Valid email is required"),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.CONTACT_EMAIL ?? "info@europeanera.eu";
const fromEmail = process.env.FROM_EMAIL ?? "European Era <onboarding@resend.dev>";

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { email } = parsed.data;

  if (!resend) {
    return NextResponse.json(
      { error: "Newsletter signup is not configured. Set RESEND_API_KEY." },
      { status: 503 }
    );
  }

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: "Newsletter signup – European Era",
    html: `<p>New newsletter signup:</p><p><strong>${email.replace(/</g, "&lt;")}</strong></p><p>Add this contact to your mailing list or CRM.</p>`,
  });

  if (error) {
    console.error("Newsletter signup send error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
