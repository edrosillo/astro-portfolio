import type { APIRoute } from "astro";

export const prerender = false;

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const env = (locals as any).runtime?.env as Env || {} as Env;
    
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const turnstileToken = formData.get("cf-turnstile-response");

    // 1. Validate Turnstile Token
    const ip = request.headers.get("CF-Connecting-IP") || "127.0.0.1";
    const turnstileResult = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA", // Env var or Test Key
          response: turnstileToken,
          remoteip: ip,
        }),
      }
    );

    const turnstileOutcome = await turnstileResult.json() as any;

    if (!turnstileOutcome.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid CAPTCHA" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // 2. Validate Form Data
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fields" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // 3. Send Email via Resend API
    if (env.RESEND_API_KEY) {
      const escapeHtml = (str: string) =>
        str.replace(
          /[&<>"']/g,
          (m) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[m as keyof { [key: string]: string }]
        );

      const safeName = escapeHtml(name as string);
      const safeEmail = escapeHtml(email as string);
      const safeMessage = escapeHtml(message as string);

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Retro Portfolio <onboarding@resend.dev>", // Default Resend test domain
          to: [env.CONTACT_EMAIL || "edrosillo@gmail.com"], // Fallback for safety
          reply_to: email, // Reply to the person who filled the form
          subject: `New Contact from ${safeName}`,
          html: `
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error("Resend API Error:", errorData);
        return new Response(
           JSON.stringify({ success: false, error: "Failed to send email." }),
           { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
        console.warn("RESEND_API_KEY is missing. Email not sent.");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message received" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    console.error("Submission Error:", err);
    return new Response(JSON.stringify({ success: false, error: "Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
